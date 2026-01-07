exports.responseHandler = (req, res, next) => {
  res.success = (data , message = '') => {
    if (data && Object.keys(data).length>0) {
      data.code = 200;
      data.message = message
    }else{
      data = {};
    }
    res.json(data);
  };

  res.error = (data ,message = '', code = 500) => {
    res.json({
      code,
      message,
      data
    });
  };
  next(); 
};
