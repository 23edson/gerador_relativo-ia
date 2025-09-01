import React, { useState, useRef, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Tooltip,
  useTheme,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  ContentCopy as DuplicateIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { ReportElement as ReportElementType, ElementPosition, ElementSize } from '../../types/report';

interface ReportElementProps {
  element: ReportElementType;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
  onMove: (position: ElementPosition) => void;
  onResize: (size: ElementSize) => void;
  onUpdate: (updates: Partial<ReportElementType>) => void;
  zoom: number;
}

export const ReportElement: React.FC<ReportElementProps> = ({
  element,
  isSelected,
  onSelect,
  onDoubleClick,
  onMove,
  onResize,
  onUpdate,
  zoom,
}) => {
  const theme = useTheme();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Função para abrir menu de contexto
  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  // Função para fechar menu de contexto
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Função para iniciar drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || element.locked) return; // Apenas botão esquerdo e elemento não bloqueado

    e.stopPropagation();
    onSelect(e);

    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  }, [element.locked, onSelect]);

  // Função para lidar com movimento do mouse durante drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStart || element.locked) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Snap to grid (opcional)
    const gridSize = 20;
    const snappedX = Math.round(newX / gridSize) * gridSize;
    const snappedY = Math.round(newY / gridSize) * gridSize;

    onMove({
      x: Math.max(0, snappedX),
      y: Math.max(0, snappedY),
      z: element.position.z,
    });
  }, [isDragging, dragStart, element.locked, element.position.z, onMove]);

  // Função para finalizar drag
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
    }
    if (isResizing) {
      setIsResizing(false);
      setResizeStart(null);
    }
  }, [isDragging, isResizing]);

  // Função para iniciar redimensionamento
  const handleResizeStart = useCallback((e: React.MouseEvent, corner: string) => {
    if (element.locked) return;

    e.stopPropagation();
    e.preventDefault();

    const rect = elementRef.current?.getBoundingClientRect();
    if (!rect) return;

    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.size.width,
      height: element.size.height,
    });

    setIsResizing(true);
  }, [element.locked, element.size.width, element.size.height]);

  // Função para lidar com redimensionamento
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeStart || element.locked) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizeStart.width + deltaX;
    let newHeight = resizeStart.height + deltaY;

    // Limites mínimos
    newWidth = Math.max(element.size.minWidth || 50, newWidth);
    newHeight = Math.max(element.size.minHeight || 50, newHeight);

    // Limites máximos
    if (element.size.maxWidth) {
      newWidth = Math.min(element.size.maxWidth, newWidth);
    }
    if (element.size.maxHeight) {
      newHeight = Math.min(element.size.maxHeight, newHeight);
    }

    onResize({
      width: newWidth,
      height: newHeight,
      minWidth: element.size.minWidth,
      minHeight: element.size.minHeight,
      maxWidth: element.size.maxWidth,
      maxHeight: element.size.maxHeight,
    });
  }, [isResizing, resizeStart, element.locked, element.size, onResize]);

  // Adicionar/remover event listeners
  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', isDragging ? handleMouseMove : handleResizeMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', isDragging ? handleMouseMove : handleResizeMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleResizeMove, handleMouseUp]);

  // Função para duplicar elemento
  const handleDuplicate = useCallback(() => {
    // Esta função será implementada no componente pai
    console.log('Duplicar elemento:', element.id);
    handleMenuClose();
  }, [element.id, handleMenuClose]);

  // Função para deletar elemento
  const handleDelete = useCallback(() => {
    // Esta função será implementada no componente pai
    console.log('Deletar elemento:', element.id);
    handleMenuClose();
  }, [element.id, handleMenuClose]);

  // Função para alternar bloqueio
  const handleToggleLock = useCallback(() => {
    onUpdate({ locked: !element.locked });
    handleMenuClose();
  }, [element.locked, onUpdate, handleMenuClose]);

  // Função para alternar visibilidade
  const handleToggleVisibility = useCallback(() => {
    onUpdate({ visible: !element.visible });
  }, [element.visible, onUpdate]);

  // Função para abrir configurações
  const handleOpenSettings = useCallback(() => {
    // Esta função será implementada no componente pai
    console.log('Abrir configurações:', element.id);
    handleMenuClose();
  }, [element.id, handleMenuClose]);

  // Renderizar conteúdo do elemento baseado no tipo
  const renderElementContent = () => {
    switch (element.type) {
      case 'field':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Campo
            </Typography>
          </Box>
        );

      case 'table':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Tabela
            </Typography>
          </Box>
        );

      case 'chart':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Gráfico
            </Typography>
          </Box>
        );

      case 'metric':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Métrica
            </Typography>
          </Box>
        );

      case 'text':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Texto
            </Typography>
          </Box>
        );

      case 'filter':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Filtro
            </Typography>
          </Box>
        );

      case 'grouping':
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Agrupamento
            </Typography>
          </Box>
        );

      default:
        return (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {element.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Elemento
            </Typography>
          </Box>
        );
    }
  };

  // Renderizar handles de redimensionamento
  const renderResizeHandles = () => {
    if (element.locked) return null;

    return (
      <>
        {/* Handle superior esquerdo */}
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            left: -4,
            width: 8,
            height: 8,
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.background.paper}`,
            cursor: 'nw-resize',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleResizeStart(e, 'nw')}
        />

        {/* Handle superior direito */}
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 8,
            height: 8,
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.background.paper}`,
            cursor: 'ne-resize',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleResizeStart(e, 'ne')}
        />

        {/* Handle inferior esquerdo */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            left: -4,
            width: 8,
            height: 8,
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.background.paper}`,
            cursor: 'sw-resize',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleResizeStart(e, 'sw')}
        />

        {/* Handle inferior direito */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 8,
            height: 8,
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.background.paper}`,
            cursor: 'se-resize',
            zIndex: 10,
          }}
          onMouseDown={(e) => handleResizeStart(e, 'se')}
        />
      </>
    );
  };

  if (!element.visible) return null;

  return (
    <Box
      ref={elementRef}
      sx={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: element.position.z,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {/* Elemento principal */}
      <Paper
        elevation={isSelected ? 8 : 2}
        sx={{
          width: '100%',
          height: '100%',
          border: isSelected 
            ? `2px solid ${theme.palette.primary.main}` 
            : '1px solid transparent',
          backgroundColor: element.locked 
            ? theme.palette.action.disabledBackground 
            : theme.palette.background.paper,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            elevation: 4,
            border: `1px solid ${theme.palette.primary.light}`,
          },
        }}
      >
        {/* Header do elemento */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 0.5,
            backgroundColor: theme.palette.action.hover,
            borderBottom: `1px solid ${theme.palette.divider}`,
            minHeight: 32,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DragIcon fontSize="small" color="action" />
            <Typography variant="caption" noWrap sx={{ maxWidth: 100 }}>
              {element.title}
            </Typography>
            {element.locked && (
              <LockIcon fontSize="small" color="action" />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={element.visible ? 'Ocultar' : 'Mostrar'}>
              <IconButton
                size="small"
                onClick={handleToggleVisibility}
                sx={{ p: 0.5 }}
              >
                {element.visible ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Mais opções">
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ p: 0.5 }}
              >
                <MoreIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Conteúdo do elemento */}
        <Box sx={{ flex: 1, height: 'calc(100% - 32px)' }}>
          {renderElementContent()}
        </Box>

        {/* Handles de redimensionamento */}
        {isSelected && renderResizeHandles()}
      </Paper>

      {/* Menu de contexto */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicar</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleToggleLock}>
          <ListItemIcon>
            {element.locked ? <UnlockIcon fontSize="small" /> : <LockIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            {element.locked ? 'Desbloquear' : 'Bloquear'}
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleOpenSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configurações</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
