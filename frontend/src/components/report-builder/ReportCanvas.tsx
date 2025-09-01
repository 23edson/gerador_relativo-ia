import React, { useRef, useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  useTheme,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  GridOn as GridIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ReportElement, ElementPosition, ElementSize } from '../../types/report';
import { calculateDropPosition, isPositionValid } from '../../utils/dragAndDrop';
import { ReportElement as ReportElementComponent } from './ReportElement';

interface ReportCanvasProps {
  elements: ReportElement[];
  layout: {
    width: number;
    height: number;
    gridSize: number;
    theme: 'light' | 'dark';
  };
  selectedElements: string[];
  onElementSelect: (elementId: string, multiSelect?: boolean) => void;
  onElementUpdate: (elementId: string, updates: Partial<ReportElement>) => void;
  onElementMove: (elementId: string, position: ElementPosition) => void;
  onElementResize: (elementId: string, size: ElementSize) => void;
  onDrop: (position: ElementPosition, targetId?: string) => void;
  onCanvasClick: () => void;
}

export const ReportCanvas: React.FC<ReportCanvasProps> = ({
  elements,
  layout,
  selectedElements,
  onElementSelect,
  onElementUpdate,
  onElementMove,
  onElementResize,
  onDrop,
  onCanvasClick,
}) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Função para lidar com drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  // Função para lidar com drag leave
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  // Função para lidar com drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const position = calculateDropPosition(
      e.clientX,
      e.clientY,
      rect,
      layout.gridSize
    );

    // Verificar se o drop é válido
    if (isPositionValid(position, { width: 100, height: 100 }, { 
      width: layout.width, 
      height: layout.height 
    })) {
      onDrop(position);
    }
  }, [layout.gridSize, layout.width, layout.height, onDrop]);

  // Função para lidar com clique no canvas
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onCanvasClick();
    }
  }, [onCanvasClick]);

  // Função para lidar com clique em elemento
  const handleElementClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const multiSelect = e.ctrlKey || e.metaKey;
    onElementSelect(elementId, multiSelect);
  }, [onElementSelect]);

  // Função para lidar com duplo clique em elemento
  const handleElementDoubleClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    // Aqui você pode abrir o painel de configuração do elemento
    console.log('Configurar elemento:', elementId);
  }, []);

  // Função para lidar com movimento de elemento
  const handleElementMove = useCallback((elementId: string, position: ElementPosition) => {
    onElementMove(elementId, position);
  }, [onElementMove]);

  // Função para lidar com redimensionamento de elemento
  const handleElementResize = useCallback((elementId: string, size: ElementSize) => {
    onElementResize(elementId, size);
  }, [onElementResize]);

  // Função para lidar com atualização de elemento
  const handleElementUpdate = useCallback((elementId: string, updates: Partial<ReportElement>) => {
    onElementUpdate(elementId, updates);
  }, [onElementUpdate]);

  // Função para aumentar zoom
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  }, []);

  // Função para diminuir zoom
  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  }, []);

  // Função para resetar zoom
  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  // Função para alternar grid
  const handleToggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

  // Renderizar grid de fundo
  const renderGrid = () => {
    if (!showGrid) return null;

    const gridLines = [];
    const { width, height, gridSize } = layout;

    // Linhas verticais
    for (let x = 0; x <= width; x += gridSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={theme.palette.divider}
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }

    // Linhas horizontais
    for (let y = 0; y <= height; y += gridSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={theme.palette.divider}
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }

    return (
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {gridLines}
      </svg>
    );
  };

  // Renderizar elementos
  const renderElements = () => {
    return elements.map((element) => (
      <ReportElementComponent
        key={element.id}
        element={element}
        isSelected={selectedElements.includes(element.id)}
        onSelect={(e) => handleElementClick(e, element.id)}
        onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
        onMove={(position) => handleElementMove(element.id, position)}
        onResize={(size) => handleElementResize(element.id, size)}
        onUpdate={(updates) => handleElementUpdate(element.id, updates)}
        zoom={zoom}
      />
    ));
  };

  return (
    <Paper
      elevation={1}
      sx={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header do Canvas */}
      <Box
        sx={{
          p: 1,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Canvas
          </Typography>
          <Chip
            label={`${layout.width} × ${layout.height}`}
            size="small"
            variant="outlined"
          />
          <Chip
            label={`Grid: ${layout.gridSize}px`}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Mostrar/Ocultar Grid">
            <IconButton
              size="small"
              onClick={handleToggleGrid}
              color={showGrid ? 'primary' : 'default'}
            >
              <GridIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Diminuir Zoom">
            <IconButton size="small" onClick={handleZoomOut}>
              <ZoomOutIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </Typography>

          <Tooltip title="Aumentar Zoom">
            <IconButton size="small" onClick={handleZoomIn}>
              <ZoomInIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Resetar Zoom">
            <IconButton size="small" onClick={handleZoomReset}>
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Tooltip title="Configurações do Canvas">
            <IconButton size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Área do Canvas */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          ref={canvasRef}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            width: layout.width,
            height: layout.height,
            minWidth: layout.width,
            minHeight: layout.height,
            position: 'relative',
            margin: 'auto',
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            cursor: isDraggingOver ? 'copy' : 'default',
            border: isDraggingOver 
              ? `2px dashed ${theme.palette.primary.main}` 
              : '1px solid transparent',
            backgroundColor: isDraggingOver 
              ? theme.palette.action.hover 
              : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Grid de fundo */}
          {renderGrid()}

          {/* Elementos do relatório */}
          {renderElements()}

          {/* Indicador de drop */}
          {isDraggingOver && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                pointerEvents: 'none',
              }}
            >
              <Typography
                variant="h6"
                color="primary.main"
                sx={{
                  textShadow: '0 0 10px rgba(0,0,0,0.5)',
                  fontWeight: 'bold',
                }}
              >
                Solte aqui para adicionar elemento
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer do Canvas */}
      <Box
        sx={{
          p: 1,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {elements.length} elementos • {selectedElements.length} selecionados
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Clique no canvas para limpar seleção • Ctrl+Clique para seleção múltipla
        </Typography>
      </Box>
    </Paper>
  );
};
