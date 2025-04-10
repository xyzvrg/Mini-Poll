import { useState } from "react";
import "./MiniPoll.css";

export default function MiniPoll() {
  const [options, setOptions] = useState([
    { id: 1, text: "LeBron James", votes: 0 },
    { id: 2, text: "Michael Jordan", votes: 0 },
    { id: 3, text: "Kots Mavs", votes: 0 },
    { id: 4, text: "Mr Long Bomb", votes: 0 }
  ]);
  
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
  
  const getLeader = () => {
    if (totalVotes === 0) return null;
    
    const maxVotes = Math.max(...options.map(opt => opt.votes));
    const leaders = options.filter(opt => opt.votes === maxVotes);
    
    if (leaders.length === 1) {
      return leaders[0];
    } else {
      return { text: "Tie between multiple players", votes: maxVotes };
    }
  };
  
  const leader = getLeader();
  

  const handleVote = (id) => {
    setOptions(options.map(option => 
      option.id === id 
        ? { ...option, votes: option.votes + 1 } 
        : option
    ));
  };
  
  const resetPoll = () => {
    setOptions(options.map(option => ({ ...option, votes: 0 })));
  };
  
  return (
    <div className="poll-container">
      <h2 className="poll-header">
        Who is the GOAT?
      </h2>
      
      <div className="options-container">
        {options.map(option => {
          const percentage = totalVotes > 0 
            ? Math.round((option.votes / totalVotes) * 100) 
            : 0;
            
          return (
            <div key={option.id} className="option-wrapper">
              <button
                className={`option-button ${
                  option.votes > 0 ? "voted" : ""
                }`}
                onClick={() => handleVote(option.id)}
                aria-pressed={option.votes > 0}
              >
                <div className="option-content">
                  <span className="option-text">{option.text}</span>
                  <span className="vote-count">
                    {option.votes} {option.votes === 1 ? "vote" : "votes"} ({percentage}%)
                  </span>
                </div>
                
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar ${
                      leader && option.votes === leader.votes ? "selected-bar" : "regular-bar"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="footer">
        <div className="button-container">
          <button 
            className="action-button reset-button"
            onClick={resetPoll}
          >
            Reset All Votes
          </button>
        </div>
        
        <div className="vote-count">
          Total votes: {totalVotes}
        </div>
      </div>
      
      {/* Display who is in the lead */}
      {totalVotes > 0 && (
        <div className="leader-section">
          <h3>Current Leader:</h3>
          <p>{leader.text} with {leader.votes} {leader.votes === 1 ? "vote" : "votes"}</p>
        </div>
      )}
    </div>
  );
}