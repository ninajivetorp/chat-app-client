import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getChatName } from '../../utils/ChatUtils';
import { AuthState } from '../../context/AuthContext';
import MessageForm from './MessageForm';
import Message from './Message';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Button from '../Button';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const { authUser, activeChat, setActiveChat } = AuthState('');

  useEffect(() => {
    (async () => {
      if (activeChat) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/message/${activeChat._id}`, { withCredentials: true });
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [activeChat]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.length > 0) {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          { content: message, chatId: activeChat._id },
          { withCredentials: true }
        );

        setMessages([...messages, data]);
        setMessage('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={` ${activeChat ? 'block' : 'hidden'} sm:block  flex-1 bg-teal50 `}>
      <div className=' h-full relative'>
        {activeChat && authUser ? (
          <>
            <div className='h-16 flex items-center justify-between px-4 border-b-2 border-teal200'>
              <div className='flex-1'>
                <Button classnames='sm:hidden flex items-center' onClick={() => setActiveChat('')}>
                  <BiArrowBack className='mr-1' /> <span className='text-sm'>Chats</span>
                </Button>
              </div>
              <h4 className='text-xl sm:text-2xl font-semibold flex-1 text-center '>{getChatName(authUser, activeChat)}</h4>
              <div className='flex-1  mr-1'>
                <AiOutlineInfoCircle className='float-right text-4xl' />
              </div>
            </div>

            <div className='scroll-bar h-full overflow-y-scroll pb-20 p-4 max-h-[calc(100vh-14.9rem)] '>
              <div className='flex flex-col justify-end min-h-full'>
                {messages.length ? messages.map((message) => <Message message={message} key={message._id} />) : <p>No Messages yet</p>}
              </div>
            </div>

            <MessageForm message={message} setMessage={setMessage} onChange={(e) => setMessage(e.target.value)} onClick={(e) => sendMessage(e)} />
          </>
        ) : (
          <div className='h-full flex justify-center items-center'>
            <h4 className='text-3xl font-semibold flex-1 text-center'>Click on a chat to start!</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;