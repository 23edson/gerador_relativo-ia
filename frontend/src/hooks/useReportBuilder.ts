import { useState, useCallback, useMemo } from 'react';
import { 
  ReportBuilder, 
  ReportElement, 
  ElementPosition, 
  ElementSize,
  DragItem,
  DropResult,
  ReportTemplate
} from '../types/report';
import { 
  createDefaultElement, 
  findFreePosition, 
  constrainPosition,
  generateElementId 
} from '../utils/dragAndDrop';
import { applyTemplate } from '../utils/reportTemplates';

export const useReportBuilder = (initialReport?: ReportBuilder) => {
  // Estado do relatório
  const [report, setReport] = useState<ReportBuilder>(initialReport || {
    id: generateElementId('report'),
    name: 'Novo Relatório',
    description: 'Relatório criado no construtor',
    dataSource: 'csv',
    layout: {
      width: 1200,
      height: 800,
      gridSize: 20,
      sections: [
        {
          id: 'header',
          title: 'Cabeçalho',
          type: 'header',
          elements: [],
          order: 0,
          visible: true,
        },
        {
          id: 'content',
          title: 'Conteúdo',
          type: 'content',
          elements: [],
          order: 1,
          visible: true,
        },
        {
          id: 'footer',
          title: 'Rodapé',
          type: 'footer',
          elements: [],
          order: 2,
          visible: true,
        },
      ],
      theme: 'light',
      responsive: true,
    },
    elements: [],
    filters: [],
    groupings: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'Sistema',
  });

  // Estado de seleção
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  // Estado de drag-and-drop
  const [isDragging, setIsDragging] = useState(false);
  const [dragItem, setDragItem] = useState<DragItem | null>(null);

  // Função para adicionar elemento
  const addElement = useCallback((
    type: string,
    position: ElementPosition,
    title?: string
  ) => {
    const newElement = createDefaultElement(type, position, title);
    
    setReport(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      updatedAt: new Date(),
    }));

    return newElement;
  }, []);

  // Função para remover elemento
  const removeElement = useCallback((elementId: string) => {
    setReport(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId),
      layout: {
        ...prev.layout,
        sections: prev.layout.sections.map(section => ({
          ...section,
          elements: section.elements.filter(id => id !== elementId),
        })),
      },
      updatedAt: new Date(),
    }));

    // Remover da seleção se estiver selecionado
    setSelectedElements(prev => prev.filter(id => id !== elementId));
    if (activeElement === elementId) {
      setActiveElement(null);
    }
  }, [activeElement]);

  // Função para atualizar elemento
  const updateElement = useCallback((
    elementId: string,
    updates: Partial<ReportElement>
  ) => {
    setReport(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      ),
      updatedAt: new Date(),
    }));
  }, []);

  // Função para mover elemento
  const moveElement = useCallback((
    elementId: string,
    newPosition: ElementPosition
  ) => {
    const element = report.elements.find(el => el.id === elementId);
    if (!element) return;

    // Verificar se a nova posição é válida
    const constrainedPosition = constrainPosition(
      newPosition,
      element.size,
      { width: report.layout.width, height: report.layout.height }
    );

    // Verificar colisões com outros elementos
    const otherElements = report.elements.filter(el => el.id !== elementId);
    const finalPosition = findFreePosition(
      constrainedPosition,
      element.size,
      otherElements,
      { width: report.layout.width, height: report.layout.height },
      report.layout.gridSize
    );

    updateElement(elementId, { position: finalPosition });
  }, [report.elements, report.layout, updateElement]);

  // Função para redimensionar elemento
  const resizeElement = useCallback((
    elementId: string,
    newSize: ElementSize
  ) => {
    const element = report.elements.find(el => el.id === elementId);
    if (!element) return;

    // Verificar se o novo tamanho é válido
    const constrainedSize = {
      ...newSize,
      width: Math.max(newSize.width, element.size.minWidth || 50),
      height: Math.max(newSize.height, element.size.minHeight || 50),
    };

    if (element.size.maxWidth) {
      constrainedSize.width = Math.min(constrainedSize.width, element.size.maxWidth);
    }
    if (element.size.maxHeight) {
      constrainedSize.height = Math.min(constrainedSize.height, element.size.maxHeight);
    }

    updateElement(elementId, { size: constrainedSize });
  }, [report.elements, updateElement]);

  // Função para selecionar elemento
  const selectElement = useCallback((elementId: string, multiSelect = false) => {
    if (multiSelect) {
      setSelectedElements(prev => {
        if (prev.includes(elementId)) {
          return prev.filter(id => id !== elementId);
        } else {
          return [...prev, elementId];
        }
      });
    } else {
      setSelectedElements([elementId]);
      setActiveElement(elementId);
    }
  }, []);

  // Função para limpar seleção
  const clearSelection = useCallback(() => {
    setSelectedElements([]);
    setActiveElement(null);
  }, []);

  // Função para aplicar template
  const applyTemplateToReport = useCallback((template: ReportTemplate) => {
    const newReport = applyTemplate(template, report.id, report.name);
    setReport(newReport);
    clearSelection();
  }, [report.id, report.name, clearSelection]);

  // Função para salvar relatório
  const saveReport = useCallback(() => {
    const updatedReport = {
      ...report,
      updatedAt: new Date(),
      status: 'draft' as const,
    };
    
    setReport(updatedReport);
    
    // Aqui você implementaria a lógica de salvamento no backend
    console.log('Salvando relatório:', updatedReport);
    
    return updatedReport;
  }, [report]);

  // Função para publicar relatório
  const publishReport = useCallback(() => {
    const publishedReport = {
      ...report,
      updatedAt: new Date(),
      status: 'published' as const,
    };
    
    setReport(publishedReport);
    
    // Aqui você implementaria a lógica de publicação no backend
    console.log('Publicando relatório:', publishedReport);
    
    return publishedReport;
  }, [report]);

  // Função para iniciar drag
  const startDrag = useCallback((item: DragItem) => {
    setDragItem(item);
    setIsDragging(true);
  }, []);

  // Função para finalizar drag
  const endDrag = useCallback(() => {
    setDragItem(null);
    setIsDragging(false);
  }, []);

  // Função para processar drop
  const handleDrop = useCallback((
    dropResult: DropResult
  ) => {
    if (!dragItem) return;

    if (dragItem.source === 'toolbox') {
      // Adicionar novo elemento
      const newElement = addElement(
        dragItem.type,
        dropResult.position,
        dragItem.data?.title
      );

      // Adicionar à seção apropriada
      if (dropResult.targetId) {
        const section = report.layout.sections.find(s => s.id === dropResult.targetId);
        if (section) {
          setReport(prev => ({
            ...prev,
            layout: {
              ...prev.layout,
              sections: prev.layout.sections.map(s =>
                s.id === dropResult.targetId
                  ? { ...s, elements: [...s.elements, newElement.id] }
                  : s
              ),
            },
          }));
        }
      }
    } else if (dragItem.source === 'canvas') {
      // Mover elemento existente
      moveElement(dragItem.id, dropResult.position);
    }

    endDrag();
  }, [dragItem, addElement, report.layout.sections, moveElement, endDrag]);

  // Função para duplicar elemento
  const duplicateElement = useCallback((elementId: string) => {
    const element = report.elements.find(el => el.id === elementId);
    if (!element) return;

    const newPosition = {
      x: element.position.x + 20,
      y: element.position.y + 20,
      z: element.position.z,
    };

    const newElement = {
      ...element,
      id: generateElementId(element.type),
      title: `${element.title} (Cópia)`,
      position: newPosition,
    };

    setReport(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      updatedAt: new Date(),
    }));

    return newElement;
  }, [report.elements]);

  // Função para agrupar elementos
  const groupElements = useCallback((elementIds: string[]) => {
    if (elementIds.length < 2) return;

    // Criar grupo
    const groupId = generateElementId('group');
    const groupElement: ReportElement = {
      id: groupId,
      type: 'grouping',
      title: 'Grupo de Elementos',
      position: { x: 0, y: 0, z: 0 },
      size: { width: 0, height: 0 },
      config: {
        groupingConfig: {
          field: 'group',
          order: 'asc',
          level: 0,
          enabled: true,
        },
      },
      data: null,
      order: 0,
      visible: true,
      locked: false,
    };

    // Adicionar grupo e atualizar elementos
    setReport(prev => ({
      ...prev,
      elements: [
        ...prev.elements,
        groupElement,
        ...prev.elements.map(el =>
          elementIds.includes(el.id)
            ? { ...el, config: { ...el.config, groupId } }
            : el
        ),
      ],
      updatedAt: new Date(),
    }));
  }, []);

  // Função para desagrupar elementos
  const ungroupElements = useCallback((groupId: string) => {
    setReport(prev => ({
      ...prev,
      elements: prev.elements
        .filter(el => el.id !== groupId)
        .map(el => {
          if (el.config.groupId === groupId) {
            const { groupId, ...config } = el.config;
            return { ...el, config };
          }
          return el;
        }),
      updatedAt: new Date(),
    }));
  }, []);

  // Computed values
  const selectedElementsData = useMemo(() => {
    return report.elements.filter(el => selectedElements.includes(el.id));
  }, [report.elements, selectedElements]);

  const activeElementData = useMemo(() => {
    return report.elements.find(el => el.id === activeElement);
  }, [report.elements, activeElement]);

  const canSave = useMemo(() => {
    return report.elements.length > 0 && report.status !== 'published';
  }, [report.elements.length, report.status]);

  const canPublish = useMemo(() => {
    return report.elements.length > 0 && report.status === 'draft';
  }, [report.elements.length, report.status]);

  return {
    // Estado
    report,
    selectedElements,
    activeElement,
    isDragging,
    dragItem,

    // Ações
    addElement,
    removeElement,
    updateElement,
    moveElement,
    resizeElement,
    selectElement,
    clearSelection,
    applyTemplateToReport,
    saveReport,
    publishReport,
    startDrag,
    endDrag,
    handleDrop,
    duplicateElement,
    groupElements,
    ungroupElements,

    // Computed values
    selectedElementsData,
    activeElementData,
    canSave,
    canPublish,
  };
};
