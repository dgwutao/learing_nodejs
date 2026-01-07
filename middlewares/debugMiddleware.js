exports.errorDebug = (options = {})=> {
  return function(err, req, res, next) {
    // 检查是否开启调试模式
    const debugEnabled = options.enabled || 
                        process.env.NODE_ENV === 'development' || 
                        req.query._debug === 'true';
    
    if (!debugEnabled) {
      return next(err);
    }
    
    // 格式化错误响应
    const errorResponse = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: err.status || 500,
      message: err.message,
      stack: err.stack,
      ...(options.includeHeaders && { headers: req.headers }),
      ...(options.includeQuery && { query: req.query }),
      ...(options.includeBody && { body: req.body })
    };
    
    // 根据请求的Accept头返回不同格式
    if (req.accepts('html')) {
      // 返回美观的HTML错误页面
      res.status(errorResponse.statusCode).render('error-debug', errorResponse);
    } else if (req.accepts('json')) {
      // 返回JSON格式错误信息
      res.status(errorResponse.statusCode).json(errorResponse);
    } else {
      // 返回纯文本格式
      res.status(errorResponse.statusCode).type('text').send(
        `ERROR: ${errorResponse.message}\n\n` +
        `Stack:\n${errorResponse.stack}\n\n` +
        `URL: ${errorResponse.method} ${errorResponse.url}\n` +
        `Time: ${errorResponse.timestamp}`
      );
    }
  };
};
