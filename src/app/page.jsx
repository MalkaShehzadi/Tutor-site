"use client";
import React, { useState } from 'react';


function MainComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "student",
    subject: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tutors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Smith",
      subject: "Mathematics",
      experience: "5-10",
      rating: 4.8,
      availability: "Mon-Fri",
      image: "https://images.squarespace-cdn.com/content/v1/61b9704c119f0a4c931700b6/b524b09a-8858-42ce-8727-2f1984d90280/Photo+Sarah+Smith.jpg",
    },
    {
      id: 2,
      name: "Prof. John Davis",
      subject: "Physics",
      experience: "10+",
      rating: 4.9,
      availability: "Weekends",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNr-sFy9dR7NXG4eEoQe_0XYq4pYhUjfs8tQ&s",
    },
    {
      id: 3,
      name: "Ms. Emily Chen",
      subject: "Chemistry",
      experience: "3-5",
      rating: 4.7,
      availability: "Tue-Sat",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGWitlHf51hsg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724239366077?e=2147483647&v=beta&t=b2diq8t2loNVEMYZA5YcTwtgYmRmYQNbe5HqnGGq52w",
    },
  ]);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState("");
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
    }
  };
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    topic: "",
    notes: "",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = () => {
    if (newChatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: formData.name || "You", message: newChatMessage },
      ]);
      setNewChatMessage("");
    }
  };
  const handleLeave = () => {
    setCurrentScreen("dashboard");
  };
  const renderNavBar = () => (
    <nav className="bg-white shadow-lg mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE0eypiU6tCqgBLtmchM7VUBXh8yrR-sdhFQ&s" alt="Logo" className="h-8" />
            <button
              onClick={() => setCurrentScreen("dashboard")}
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentScreen("tutors")}
              className="text-gray-700 hover:text-blue-600"
            >
              Find Tutors
            </button>
            <button
              onClick={() => setCurrentScreen("lecture")}
              className="text-gray-700 hover:text-blue-600"
            >
              Join Lecture
            </button>
            <button
              onClick={() => setCurrentScreen("profile")}
              className="text-gray-700 hover:text-blue-600"
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentScreen("payment")}
              className="text-gray-700 hover:text-blue-600"
            >
              Payment
            </button>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-700 hover:text-blue-600"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </div>
    </nav>
  );
  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {[].length === 0 ? (
              <p className="text-gray-500">No upcoming sessions</p>
            ) : null}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[].length === 0 ? (
              <p className="text-gray-500">No recent activity</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
  const renderProfile = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
        Profile
      </h1>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src="/avatar-placeholder.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {formData.name || "User Name"}
            </h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {renderNavBar()}
        <div className="max-w-6xl mx-auto px-6">
          {currentScreen === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
                Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Upcoming Sessions
                  </h2>
                  <div className="space-y-4">
                    {[].length === 0 ? (
                      <p className="text-gray-500">No upcoming sessions</p>
                    ) : null}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {[].length === 0 ? (
                      <p className="text-gray-500">No recent activity</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Session Feedback</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rate your experience
                    </label>
                    <div className="flex space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-2xl text-yellow-400 hover:text-yellow-500"
                        >
                          <i className="fas fa-star"></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your feedback
                    </label>
                    <textarea
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Share your thoughts about the session..."
                    ></textarea>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentScreen === "tutors" && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
                Available Tutors
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={tutor.image}
                        alt={`${tutor.name}'s profile`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{tutor.name}</h3>
                        <p className="text-blue-600">{tutor.subject}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        {tutor.rating} Rating
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-briefcase mr-1"></i>
                        {tutor.experience} years experience
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-calendar mr-1"></i>
                        Available: {tutor.availability}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedTutor(tutor);
                          setShowBookingModal(true);
                        }}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">
                      Book Session with {selectedTutor?.name}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={bookingData.date}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={bookingData.time}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              time: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Topic
                        </label>
                        <input
                          type="text"
                          name="topic"
                          placeholder="What would you like to learn?"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={bookingData.topic}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              topic: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Additional Notes
                        </label>
                        <textarea
                          name="notes"
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={bookingData.notes}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              notes: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            console.log("Booking confirmed:", {
                              tutor: selectedTutor,
                              ...bookingData,
                            });
                            setShowBookingModal(false);
                          }}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                          Confirm Booking
                        </button>
                        <button
                          onClick={() => setShowBookingModal(false)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedTutor && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold">
                      Chat with {selectedTutor.name}
                    </h3>
                    <button
                      onClick={() => setSelectedTutor(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="h-96 p-4 overflow-y-auto flex flex-col space-y-2">
                    <div className="flex justify-end">
                      <div className="bg-blue-100 rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">
                          Hi, I'm interested in learning more about your
                          tutoring.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">
                          Hello! I'd be happy to help. What would you like to
                          know?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {currentScreen === "profile" && renderProfile()}
          {currentScreen === "payment" && (
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const cardNumber = e.target.elements.cardNumber.value;
                  const expiryDate = e.target.elements.expiryDate.value;
                  const cvv = e.target.elements.cvv.value;
                  const nameOnCard = e.target.elements.nameOnCard.value;

                  if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
                    alert(
                      "Please fill in all payment details before proceeding"
                    );
                    return;
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Pay Now
                </button>
              </form>
            </div>
          )}
          {currentScreen === "lecture" && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-3/4">
                  <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center mb-4">
                    {isVideoOn ? (
                      <video
                        className="w-full h-full rounded-lg"
                        autoPlay
                        muted={isMuted}
                      >
                        <source src="/placeholder-video.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <i className="fas fa-video-slash text-4xl text-white"></i>
                    )}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Current Topic: Introduction to Calculus
                    </h2>
                    <p className="text-gray-600">Dr. Sarah Smith</p>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <i
                        className={`fas fa-${
                          isMuted ? "microphone-slash" : "microphone"
                        } mr-2`}
                      ></i>
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <i
                        className={`fas fa-${
                          isVideoOn ? "video" : "video-slash"
                        } mr-2`}
                      ></i>
                      {isVideoOn ? "Stop Video" : "Start Video"}
                    </button>
                    <button
                      onClick={handleLeave}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <i className="fas fa-phone-slash mr-2"></i>Leave
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/4 space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Participants (2)</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <i className="fas fa-user-circle mr-2"></i>
                        Dr. Sarah Smith (Host)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-user-circle mr-2"></i>
                        {formData.name || "You"}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg h-64 flex flex-col">
                    <h3 className="font-semibold mb-2">Chat</h3>
                    <div className="flex-1 overflow-y-auto mb-4">
                      <div className="space-y-2">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-semibold">{msg.sender}:</span>{" "}
                            {msg.message}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newChatMessage}
                        onChange={(e) => setNewChatMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type a message..."
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                      >
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Tutor App Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;