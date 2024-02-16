import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LogoutConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p>คุณต้องการจะออกจากระบบหรือไม่?</p>
        <div className="flex justify-center mt-4">
          <button className="mr-4" onClick={onConfirm}>ใช่</button>
          <button onClick={onCancel}>ไม่</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;
