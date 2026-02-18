import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users as UsersIcon, Zap, ArrowLeft, Star, MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import RideMap from '../components/RideMap';

const RideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRideById, updateRide, deleteRide, addRating, getTargetAverageRating } = useData();
  const { user } = useAuth();
  const [ride, setRide] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const rideData = getRideById(id);
    setRide(rideData);
  }, [id, getRideById]);

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-throttle-text-secondary">Ride not found</p>
      </div>
    );
  }

  const isJoined = ride.riders.includes(user.id);
  const isFull = ride.currentRiders >= ride.maxRiders;
  const isCreator = ride.createdById === user.id;
  const averageRating = getTargetAverageRating(ride.id);

  const handleJoinRide = () => {
    if (!isFull && !isJoined) {
      updateRide(ride.id, {
        riders: [...ride.riders, user.id],
        currentRiders: ride.currentRiders + 1,
      });
      setRide({ ...ride, riders: [...ride.riders, user.id], currentRiders: ride.currentRiders + 1 });
    }
  };

  const handleLeaveRide = () => {
    if (isJoined && !isCreator) {
      updateRide(ride.id, {
        riders: ride.riders.filter(r => r !== user.id),
        currentRiders: ride.currentRiders - 1,
      });
      setRide({
        ...ride,
        riders: ride.riders.filter(r => r !== user.id),
        currentRiders: ride.currentRiders - 1,
      });
    }
  };

  const handleDeleteRide = () => {
    if (isCreator) {
      deleteRide(ride.id);
      navigate('/rides');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        text: comment,
        timestamp: new Date().toISOString(),
      };
      updateRide(ride.id, {
        comments: [...(ride.comments || []), newComment],
      });
      setRide({ ...ride, comments: [...(ride.comments || []), newComment] });
      setComment('');
    }
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    addRating({
      id: Date.now().toString(),
      targetId: ride.id,
      targetType: 'ride',
      userId: user.id,
      userName: user.name,
      rating,
      timestamp: new Date().toISOString(),
    });
    setShowRatingModal(false);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
        {/* Hero Image */}
        <div className="relative h-[50vh]">
          <img
            src={ride.image}
            alt={ride.title}
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          
          {ride.isEV && (
            <div className="absolute top-6 right-6 bg-throttle-neon-green text-black px-4 py-2 font-bold uppercase flex items-center gap-2">
              <Zap size={16} />
              EV RIDE
            </div>
          )}

          <button
            onClick={() => navigate('/rides')}
            data-testid="back-to-rides"
            className="absolute top-6 left-6 glass-panel p-3 text-white hover:text-throttle-red transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              {ride.title}
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
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6">RIDE DETAILS</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-throttle-red mt-1" size={20} />
                    <div>
                      <p className="text-sm text-throttle-text-muted uppercase">Location</p>
                      <p className="text-white">{ride.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="text-throttle-red mt-1" size={20} />
                    <div>
                      <p className="text-sm text-throttle-text-muted uppercase">Date & Time</p>
                      <p className="text-white">
                        {new Date(ride.date).toLocaleDateString()} at {ride.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UsersIcon className="text-throttle-red mt-1" size={20} />
                    <div>
                      <p className="text-sm text-throttle-text-muted uppercase">Riders</p>
                      <p className="text-white">{ride.currentRiders} / {ride.maxRiders}</p>
                    </div>
                  </div>

                  {averageRating > 0 && (
                    <div className="flex items-start gap-3">
                      <Star className="text-throttle-red mt-1" size={20} />
                      <div>
                        <p className="text-sm text-throttle-text-muted uppercase">Rating</p>
                        <p className="text-white">{averageRating} / 5</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-throttle-border">
                  <p className="text-sm text-throttle-text-muted uppercase mb-2">Description</p>
                  <p className="text-throttle-text-secondary leading-relaxed">{ride.description}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-throttle-border">
                  <p className="text-sm text-throttle-text-muted uppercase mb-2">Created By</p>
                  <p className="text-white font-bold">{ride.createdBy}</p>
                </div>
              </div>

              {/* Map */}
              {ride.location_data && (
                <div>
                  <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-4">LOCATION</h2>
                  <RideMap
                    rides={[ride]}
                    center={{
                      lat: ride.location_data.latitude,
                      lng: ride.location_data.longitude,
                    }}
                    zoom={14}
                    height="400px"
                  />
                </div>
              )}

              {/* Comments */}
              <div className="glass-panel p-8">
                <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                  <MessageCircle size={24} />
                  COMMENTS
                </h2>

                <form onSubmit={handleAddComment} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    data-testid="comment-input"
                    className="input-throttle w-full px-4 py-3 min-h-[100px] mb-4"
                    placeholder="Add a comment..."
                  />
                  <button
                    type="submit"
                    data-testid="submit-comment"
                    className="bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-2 font-bold uppercase tracking-wider transition-colors"
                  >
                    POST
                  </button>
                </form>

                <div className="space-y-4">
                  {(ride.comments || []).map((c) => (
                    <div key={c.id} className="border-l-2 border-throttle-red pl-4">
                      <p className="text-sm text-throttle-text-muted">
                        {c.userName} • {new Date(c.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-white mt-1">{c.text}</p>
                    </div>
                  ))}
                  {(!ride.comments || ride.comments.length === 0) && (
                    <p className="text-throttle-text-muted text-center py-8">No comments yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="glass-panel p-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4">ACTIONS</h3>
                
                {!isCreator && (
                  <>
                    {!isJoined ? (
                      <button
                        onClick={handleJoinRide}
                        disabled={isFull}
                        data-testid="join-ride-detail"
                        className="w-full bg-throttle-red hover:bg-throttle-red-hover disabled:bg-throttle-text-muted disabled:cursor-not-allowed text-white px-6 py-3 font-bold uppercase tracking-wider transition-colors mb-3"
                      >
                        {isFull ? 'RIDE FULL' : 'JOIN RIDE'}
                      </button>
                    ) : (
                      <button
                        onClick={handleLeaveRide}
                        data-testid="leave-ride"
                        className="w-full bg-transparent border border-throttle-red text-throttle-red hover:bg-throttle-red hover:text-white px-6 py-3 font-bold uppercase tracking-wider transition-all mb-3"
                      >
                        LEAVE RIDE
                      </button>
                    )}
                  </>
                )}

                {isJoined && (
                  <button
                    onClick={() => setShowRatingModal(true)}
                    data-testid="rate-ride"
                    className="w-full bg-transparent border border-white/20 hover:border-throttle-neon-green text-white px-6 py-3 font-bold uppercase tracking-wider transition-all mb-3"
                  >
                    RATE RIDE
                  </button>
                )}

                {isCreator && (
                  <button
                    onClick={handleDeleteRide}
                    data-testid="delete-ride"
                    className="w-full bg-transparent border border-throttle-red text-throttle-red hover:bg-throttle-red hover:text-white px-6 py-3 font-bold uppercase tracking-wider transition-all"
                  >
                    DELETE RIDE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 max-w-md w-full"
            >
              <h2 className="font-heading text-2xl font-black uppercase tracking-tighter mb-6">
                RATE THIS <span className="text-throttle-red">RIDE</span>
              </h2>

              <form onSubmit={handleSubmitRating} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-4">
                    Rating (1-5 stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        data-testid={`star-${star}`}
                        className="text-3xl transition-colors"
                      >
                        <Star
                          size={32}
                          fill={star <= rating ? '#E10600' : 'none'}
                          stroke={star <= rating ? '#E10600' : '#525252'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    data-testid="submit-rating"
                    className="flex-1 bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    data-testid="cancel-rating"
                    className="flex-1 bg-transparent border border-white/20 hover:border-throttle-red text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </APIProvider>
  );
};

export default RideDetail;