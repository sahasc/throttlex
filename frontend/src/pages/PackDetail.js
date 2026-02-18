import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users as UsersIcon, ArrowLeft, Send } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const PackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPackById, updatePack, getPackMessages, addMessage } = useData();
  const { user } = useAuth();
  const [pack, setPack] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const packData = getPackById(id);
    setPack(packData);
    
    if (packData) {
      const packMessages = getPackMessages(id);
      setMessages(packMessages);
    }
  }, [id, getPackById, getPackMessages]);

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-throttle-text-secondary">Pack not found</p>
      </div>
    );
  }

  const isMember = pack.members.includes(user.id);
  const isCreator = pack.createdById === user.id;

  const handleJoinPack = () => {
    if (!isMember) {
      updatePack(pack.id, {
        members: [...pack.members, user.id],
      });
      setPack({ ...pack, members: [...pack.members, user.id] });
    }
  };

  const handleLeavePack = () => {
    if (isMember && !isCreator) {
      updatePack(pack.id, {
        members: pack.members.filter(m => m !== user.id),
      });
      setPack({ ...pack, members: pack.members.filter(m => m !== user.id) });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && isMember) {
      const message = {
        id: Date.now().toString(),
        packId: pack.id,
        userId: user.id,
        userName: user.name,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      addMessage(message);
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Hero Image */}
      <div className="relative h-[40vh]">
        <img
          src={pack.image}
          alt={pack.name}
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <button
          onClick={() => navigate('/packs')}
          data-testid="back-to-packs"
          className="absolute top-6 left-6 glass-panel p-3 text-white hover:text-throttle-red transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            {pack.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Details */}
            <div className="glass-panel p-8">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6">PACK DETAILS</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UsersIcon className="text-throttle-red mt-1" size={20} />
                  <div>
                    <p className="text-sm text-throttle-text-muted uppercase">Members</p>
                    <p className="text-white">{pack.members.length}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-throttle-border">
                <p className="text-sm text-throttle-text-muted uppercase mb-2">Description</p>
                <p className="text-throttle-text-secondary leading-relaxed">{pack.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-throttle-border">
                <p className="text-sm text-throttle-text-muted uppercase mb-2">Created By</p>
                <p className="text-white font-bold">{pack.createdBy}</p>
              </div>
            </div>

            {/* Chat */}
            {isMember && (
              <div className="glass-panel p-8">
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6">PACK CHAT</h2>

                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 ${
                        msg.userId === user.id
                          ? 'bg-throttle-red/20 ml-12'
                          : 'bg-throttle-bg-secondary mr-12'
                      }`}
                    >
                      <p className="text-sm text-throttle-text-muted mb-1">
                        {msg.userName} • {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                      <p className="text-white">{msg.text}</p>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-throttle-text-muted text-center py-8">No messages yet</p>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    data-testid="chat-message-input"
                    className="input-throttle flex-1 px-4 py-3"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    data-testid="send-message"
                    className="bg-throttle-red hover:bg-throttle-red-hover text-white p-3 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="glass-panel p-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4">ACTIONS</h3>
              
              {!isCreator && (
                <>
                  {!isMember ? (
                    <button
                      onClick={handleJoinPack}
                      data-testid="join-pack-detail"
                      className="w-full bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-bold uppercase tracking-wider transition-colors"
                    >
                      JOIN PACK
                    </button>
                  ) : (
                    <button
                      onClick={handleLeavePack}
                      data-testid="leave-pack"
                      className="w-full bg-transparent border border-throttle-red text-throttle-red hover:bg-throttle-red hover:text-white px-6 py-3 font-bold uppercase tracking-wider transition-all"
                    >
                      LEAVE PACK
                    </button>
                  )}
                </>
              )}

              {isCreator && (
                <p className="text-throttle-text-muted text-sm text-center">You created this pack</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackDetail;
