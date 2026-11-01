
function detectDevice() {
  // 获取UserAgent字符串
  const userAgent = navigator.userAgent.toLowerCase();
  
  // 检测移动设备
  const isMobile = /iphone|ipod|android|blackberry|opera mini|windows phone|iemobile|mobile/i.test(userAgent);
  
  // 检测平板设备
  const isTablet = /ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(userAgent);
  
  // 屏幕尺寸检测
  const screenWidth = window.screen.width;
  const isSmallScreen = screenWidth < 768;
  
  console.log('detectDevice')
  // 综合判断设备类型
  if (isMobile || isSmallScreen) {
    return 'mobile';
  } else if (isTablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// 执行设备检测并跳转
// const deviceType = detectDevice();

// if (deviceType === 'mobile') {
//   window.location.href = 'mobile.html';
// } else if (deviceType === 'tablet') {
//   window.location.href = 'tablet.html';
// } else {
//   window.location.href = 'desktop.html';
// }