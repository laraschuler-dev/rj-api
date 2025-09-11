import { ErrorRequestHandler } from 'express';
import multer from 'multer';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({
        error: 'Você só pode enviar até 5 imagens por post.',
      });
      return;
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        error: 'O tamanho máximo permitido para cada imagem é de 5MB.',
      });
      return;
    }

    res.status(400).json({
      error: 'Erro ao fazer upload dos arquivos.',
    });
    return;
  }

  res.status(500).json({
    error: err.message || 'Erro interno no servidor',
  });
};
