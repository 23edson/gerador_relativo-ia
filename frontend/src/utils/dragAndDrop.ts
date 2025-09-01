import { DragItem, DropResult, ElementPosition, ElementSize } from '../types/report';

// Constantes para drag-and-drop
export const DRAG_TYPES = {
  FIELD: 'field',
  TABLE: 'table',
  CHART: 'chart',
  METRIC: 'metric',
  TEXT: 'text',
  FILTER: 'filter',
  GROUPING: 'grouping',
  TEMPLATE: 'template',
} as const;

export const DROP_ZONES = {
  CANVAS: 'canvas',
  SECTION: 'section',
  ELEMENT: 'element',
} as const;

// Função para verificar se um item pode ser solto em uma zona
export const canDrop = (dragItem: DragItem, dropZone: string): boolean => {
  switch (dropZone) {
    case DROP_ZONES.CANVAS:
      return true; // Canvas aceita todos os tipos
    case DROP_ZONES.SECTION:
      return dragItem.type !== DRAG_TYPES.TEMPLATE; // Seções não aceitam templates
    case DROP_ZONES.ELEMENT:
      return dragItem.type === DRAG_TYPES.FIELD; // Elementos só aceitam campos
    default:
      return false;
  }
};

// Função para calcular posição de drop baseada no mouse
export const calculateDropPosition = (
  clientX: number,
  clientY: number,
  containerRect: DOMRect,
  gridSize: number = 20
): ElementPosition => {
  const relativeX = clientX - containerRect.left;
  const relativeY = clientY - containerRect.top;
  
  // Snap to grid
  const x = Math.round(relativeX / gridSize) * gridSize;
  const y = Math.round(relativeY / gridSize) * gridSize;
  
  return { x, y, z: 0 };
};

// Função para verificar se uma posição está dentro dos limites
export const isPositionValid = (
  position: ElementPosition,
  size: ElementSize,
  containerSize: ElementSize
): boolean => {
  const { x, y } = position;
  const { width, height } = size;
  const { width: containerWidth, height: containerHeight } = containerSize;
  
  return (
    x >= 0 &&
    y >= 0 &&
    x + width <= containerWidth &&
    y + height <= containerHeight
  );
};

// Função para ajustar posição para ficar dentro dos limites
export const constrainPosition = (
  position: ElementPosition,
  size: ElementSize,
  containerSize: ElementSize
): ElementPosition => {
  let { x, y, z } = position;
  const { width, height } = size;
  const { width: containerWidth, height: containerHeight } = containerSize;
  
  // Ajustar X
  if (x < 0) x = 0;
  if (x + width > containerWidth) x = containerWidth - width;
  
  // Ajustar Y
  if (y < 0) y = 0;
  if (y + height > containerHeight) y = containerHeight - height;
  
  return { x, y, z };
};

// Função para detectar colisão entre elementos
export const detectCollision = (
  element1: { position: ElementPosition; size: ElementSize },
  element2: { position: ElementPosition; size: ElementSize }
): boolean => {
  const { position: pos1, size: size1 } = element1;
  const { position: pos2, size: size2 } = element2;
  
  return !(
    pos1.x + size1.width <= pos2.x ||
    pos2.x + size2.width <= pos1.x ||
    pos1.y + size1.height <= pos2.y ||
    pos2.y + size2.height <= pos1.y
  );
};

// Função para encontrar posição livre próxima
export const findFreePosition = (
  desiredPosition: ElementPosition,
  size: ElementSize,
  existingElements: Array<{ position: ElementPosition; size: ElementSize }>,
  containerSize: ElementSize,
  gridSize: number = 20
): ElementPosition => {
  let position = { ...desiredPosition };
  
  // Tentar posição original
  if (!hasCollision(position, size, existingElements)) {
    return position;
  }
  
  // Buscar posição livre em espiral
  const maxAttempts = 100;
  let attempts = 0;
  let radius = 1;
  
  while (attempts < maxAttempts) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
          const testPosition = {
            x: desiredPosition.x + dx * gridSize,
            y: desiredPosition.y + dy * gridSize,
            z: desiredPosition.z,
          };
          
          // Verificar se está dentro dos limites
          if (isPositionValid(testPosition, size, containerSize)) {
            // Verificar se não há colisão
            if (!hasCollision(testPosition, size, existingElements)) {
              return testPosition;
            }
          }
        }
      }
    }
    
    radius++;
    attempts++;
  }
  
  // Se não encontrar posição livre, retornar posição original
  return desiredPosition;
};

// Função para verificar se há colisão com elementos existentes
export const hasCollision = (
  position: ElementPosition,
  size: ElementSize,
  existingElements: Array<{ position: ElementPosition; size: ElementSize }>
): boolean => {
  return existingElements.some(element => 
    detectCollision({ position, size }, element)
  );
};

// Função para gerar ID único para elementos
export const generateElementId = (type: string): string => {
  return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para criar elemento padrão
export const createDefaultElement = (
  type: string,
  position: ElementPosition,
  title?: string
) => {
  const id = generateElementId(type);
  
  const defaultSizes: Record<string, ElementSize> = {
    [DRAG_TYPES.FIELD]: { width: 150, height: 40 },
    [DRAG_TYPES.TABLE]: { width: 600, height: 400 },
    [DRAG_TYPES.CHART]: { width: 400, height: 300 },
    [DRAG_TYPES.METRIC]: { width: 200, height: 100 },
    [DRAG_TYPES.TEXT]: { width: 300, height: 80 },
    [DRAG_TYPES.FILTER]: { width: 200, height: 60 },
    [DRAG_TYPES.GROUPING]: { width: 200, height: 60 },
  };
  
  return {
    id,
    type,
    title: title || `Novo ${type}`,
    position,
    size: defaultSizes[type] || { width: 200, height: 100 },
    config: {},
    data: null,
    order: 0,
    visible: true,
    locked: false,
  };
};

// Função para calcular distância entre duas posições
export const calculateDistance = (
  pos1: ElementPosition,
  pos2: ElementPosition
): number => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Função para encontrar elemento mais próximo
export const findNearestElement = (
  position: ElementPosition,
  elements: Array<{ position: ElementPosition; size: ElementSize }>
): { element: any; distance: number } | null => {
  if (elements.length === 0) return null;
  
  let nearest = null;
  let minDistance = Infinity;
  
  elements.forEach(element => {
    const distance = calculateDistance(position, element.position);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = element;
    }
  });
  
  return nearest ? { element: nearest, distance: minDistance } : null;
};
