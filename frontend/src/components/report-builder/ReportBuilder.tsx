import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  IconButton, 
  Tooltip, 
  useTheme,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  Visibility as PreviewIcon,
  Download as ExportIcon,
  Add as AddIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Settings as SettingsIcon,
  Add as TemplateIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useReportBuilder } from '../../hooks/useReportBuilder';
import { ReportToolbox } from './ReportToolbox';
import { ReportCanvas } from './ReportCanvas';
import { ToolboxItem, DragItem } from '../../types/report';
import { getAllTemplates, applyTemplate } from '../../utils/reportTemplates';

interface ReportBuilderProps {
  reportId?: string;
  initialReport?: any;
  onSave?: (report: any) => void;
  onPreview?: () => void;
  onExport?: () => void;
  readOnly?: boolean;
}

export const ReportBuilder: React.FC<ReportBuilderProps> = ({
  reportId,
  initialReport,
  onSave,
  onPreview,
  onExport,
  readOnly = false,
}) => {
  const theme = useTheme();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Hook principal do construtor
  const {
    report,
    selectedElements,
    activeElement,
    isDragging,
    dragItem,
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
    selectedElementsData,
    activeElementData,
    canSave,
    canPublish,
  } = useReportBuilder(initialReport);

  // Estado local para configurações
  const [reportName, setReportName] = useState(report.name);
  const [reportDescription, setReportDescription] = useState(report.description);
  const [reportDataSource, setReportDataSource] = useState(report.dataSource);

  // Função para lidar com início de drag da toolbox
  const handleToolboxDragStart = useCallback((item: ToolboxItem) => {
    const dragItem: DragItem = {
      id: item.id,
      type: item.type,
      data: item.data,
      source: 'toolbox',
    };
    startDrag(dragItem);
  }, [startDrag]);

  // Função para lidar com fim de drag da toolbox
  const handleToolboxDragEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  // Função para lidar com drop no canvas
  const handleCanvasDrop = useCallback((position: any, targetId?: string) => {
    if (dragItem?.source === 'toolbox') {
      // Adicionar novo elemento
      const newElement = addElement(
        dragItem.type,
        position,
        dragItem.data?.title
      );

      // Adicionar à seção apropriada se houver target
      if (targetId) {
        const section = report.layout.sections.find(s => s.id === targetId);
        if (section) {
          updateElement(newElement.id, { 
            config: { ...newElement.config, sectionId: targetId } 
          });
        }
      }

      showSnackbar('Elemento adicionado com sucesso!', 'success');
    }
  }, [dragItem, addElement, report.layout.sections, updateElement]);

  // Função para lidar com clique no canvas
  const handleCanvasClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  // Função para lidar com seleção de elemento
  const handleElementSelect = useCallback((elementId: string, multiSelect = false) => {
    selectElement(elementId, multiSelect);
  }, [selectElement]);

  // Função para lidar com atualização de elemento
  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    updateElement(elementId, updates);
  }, [updateElement]);

  // Função para lidar com movimento de elemento
  const handleElementMove = useCallback((elementId: string, position: any) => {
    moveElement(elementId, position);
  }, [moveElement]);

  // Função para lidar com redimensionamento de elemento
  const handleElementResize = useCallback((elementId: string, size: any) => {
    resizeElement(elementId, size);
  }, [resizeElement]);

  // Função para lidar com salvamento
  const handleSave = useCallback(() => {
    try {
      const updatedReport = {
        ...report,
        name: reportName,
        description: reportDescription,
        dataSource: reportDataSource,
      };

      // Atualizar estado local
      updateElement('report', updatedReport);

      // Chamar callback de salvamento
      if (onSave) {
        onSave(updatedReport);
      }

      showSnackbar('Relatório salvo com sucesso!', 'success');
    } catch (error) {
      showSnackbar('Erro ao salvar relatório', 'error');
    }
  }, [report, reportName, reportDescription, reportDataSource, onSave, updateElement]);

  // Função para lidar com publicação
  const handlePublish = useCallback(() => {
    try {
      const publishedReport = publishReport();
      
      if (onSave) {
        onSave(publishedReport);
      }

      showSnackbar('Relatório publicado com sucesso!', 'success');
    } catch (error) {
      showSnackbar('Erro ao publicar relatório', 'error');
    }
  }, [publishReport, onSave]);

  // Função para lidar com preview
  const handlePreview = useCallback(() => {
    if (onPreview) {
      onPreview();
    }
  }, [onPreview]);

  // Função para lidar com exportação
  const handleExport = useCallback(() => {
    if (onExport) {
      onExport();
    }
  }, [onExport]);

  // Função para aplicar template
  const handleApplyTemplate = useCallback((template: any) => {
    try {
      applyTemplateToReport(template);
      setShowTemplates(false);
      showSnackbar('Template aplicado com sucesso!', 'success');
    } catch (error) {
      showSnackbar('Erro ao aplicar template', 'error');
    }
  }, [applyTemplateToReport]);

  // Função para mostrar snackbar
  const showSnackbar = useCallback((message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  // Função para fechar snackbar
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  // Função para deletar elemento selecionado
  const handleDeleteSelected = useCallback(() => {
    if (selectedElements.length === 0) return;

    selectedElements.forEach(elementId => {
      removeElement(elementId);
    });

    clearSelection();
    showSnackbar(`${selectedElements.length} elemento(s) removido(s)`, 'info');
  }, [selectedElements, removeElement, clearSelection]);

  // Função para duplicar elemento selecionado
  const handleDuplicateSelected = useCallback(() => {
    if (selectedElements.length !== 1) return;

    const elementId = selectedElements[0];
    const element = report.elements.find(el => el.id === elementId);
    
    if (element) {
      duplicateElement(elementId);
      showSnackbar('Elemento duplicado com sucesso!', 'success');
    }
  }, [selectedElements, report.elements, duplicateElement]);

  // Função para agrupar elementos selecionados
  const handleGroupSelected = useCallback(() => {
    if (selectedElements.length < 2) return;

    groupElements(selectedElements);
    showSnackbar('Elementos agrupados com sucesso!', 'success');
  }, [selectedElements, groupElements]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Construtor de Relatórios
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {report.name} • {report.elements.length} elementos • {report.status}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<TemplateIcon />}
              onClick={() => setShowTemplates(true)}
              disabled={readOnly}
            >
              Templates
            </Button>

            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => setShowSettings(true)}
              disabled={readOnly}
            >
              Configurações
            </Button>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Button
              variant="outlined"
              startIcon={<PreviewIcon />}
              onClick={handlePreview}
            >
              Preview
            </Button>

            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={handleExport}
            >
              Exportar
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!canSave || readOnly}
            >
              Salvar
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handlePublish}
              disabled={!canPublish || readOnly}
            >
              Publicar
            </Button>
          </Box>
        </Box>

        {/* Barra de ferramentas */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => addElement('text', { x: 100, y: 100, z: 0 })}
            disabled={readOnly}
          >
            Adicionar Texto
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => addElement('table', { x: 100, y: 200, z: 0 })}
            disabled={readOnly}
          >
            Adicionar Tabela
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => addElement('chart', { x: 100, y: 300, z: 0 })}
            disabled={readOnly}
          >
            Adicionar Gráfico
          </Button>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<UndoIcon />}
            disabled={readOnly}
          >
            Desfazer
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<RedoIcon />}
            disabled={readOnly}
          >
            Refazer
          </Button>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleDuplicateSelected}
            disabled={selectedElements.length !== 1 || readOnly}
          >
            Duplicar
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleGroupSelected}
            disabled={selectedElements.length < 2 || readOnly}
          >
            Agrupar
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<CloseIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedElements.length === 0 || readOnly}
          >
            Excluir
          </Button>
        </Box>
      </Paper>

      {/* Área principal */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Toolbox */}
        <ReportToolbox
          onDragStart={handleToolboxDragStart}
          onDragEnd={handleToolboxDragEnd}
        />

        {/* Canvas */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ReportCanvas
            elements={report.elements}
            layout={report.layout}
            selectedElements={selectedElements}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementMove={handleElementMove}
            onElementResize={handleElementResize}
            onDrop={handleCanvasDrop}
            onCanvasClick={handleCanvasClick}
          />
        </Box>
      </Box>

      {/* Dialog de Templates */}
      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Selecionar Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {getAllTemplates().map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Paper
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                  onClick={() => handleApplyTemplate(template)}
                >
                  <Typography variant="h6" gutterBottom>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {template.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {template.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTemplates(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Configurações */}
      <Dialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Configurações do Relatório</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Relatório"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                multiline
                rows={3}
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Fonte de Dados</InputLabel>
                <Select
                  value={reportDataSource}
                  onChange={(e) => setReportDataSource(e.target.value)}
                  disabled={readOnly}
                >
                  <MenuItem value="csv">CSV</MenuItem>
                  <MenuItem value="xlsx">Excel</MenuItem>
                  <MenuItem value="api">API</MenuItem>
                  <MenuItem value="postgresql">PostgreSQL</MenuItem>
                  <MenuItem value="nlp">Processamento de Linguagem Natural</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
