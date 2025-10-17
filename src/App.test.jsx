// 最简单的测试组件 - 用于验证React是否工作
import React from 'react';

function TestApp() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#87CEEB',
      color: 'white',
      fontSize: '48px',
      fontFamily: 'Arial'
    }}>
      <h1 style={{marginBottom: '20px'}}>✅ React 工作正常!</h1>
      <p style={{fontSize: '24px'}}>EasyFly 测试页面</p>
      <button 
        onClick={() => alert('按钮点击成功!')}
        style={{
          marginTop: '30px',
          padding: '20px 40px',
          fontSize: '24px',
          backgroundColor: '#4A90E2',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
      >
        点击测试
      </button>
    </div>
  );
}

export default TestApp;
