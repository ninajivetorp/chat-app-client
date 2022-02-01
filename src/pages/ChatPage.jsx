import React, { useEffect } from 'react';
import { AuthState } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';
import ChatMenu from '../components/ChatMenu';

const ChatPage = () => {
  const { authUser } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>CHATPAGE</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ChatMenu />
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;
