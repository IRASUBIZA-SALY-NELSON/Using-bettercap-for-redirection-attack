import React, { useState, useEffect } from 'react';

const TypewriterNelsonPage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]);

  const text = "IRASUBIZA SALY Nelson";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        const delay = Math.random() * 100 + 50;
        setTimeout(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          typeWriter();
        }, delay + 80);
      } else {
        setTimeout(() => {
          setShowCursor(false);
        }, 2000);
      }
    };

    setTimeout(typeWriter, 1000);

    // Show subtitle after typing is complete
    setTimeout(() => {
      setShowSubtitle(true);
    }, 4000);
  }, []);

  useEffect(() => {
    const createFloatingText = () => {
      const messages = ['HELP', 'NELSON', 'SYSTEM', 'MESSAGE', '404', 'CONTACT'];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const id = Date.now() + Math.random();
      const newText = {
        id,
        message,
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 2 + 's'
      };

      setFloatingTexts(prev => [...prev, newText]);

      setTimeout(() => {
        setFloatingTexts(prev => prev.filter(text => text.id !== id));
      }, 6000);
    };

    // Initial floating texts
    for (let i = 0; i < 3; i++) {
      setTimeout(createFloatingText, i * 500);
    }

    // Create floating text periodically
    const interval = setInterval(createFloatingText, 1500);

    return () => clearInterval(interval);
  }, []);

  const shouldGlitch = () => Math.random() < 0.1;

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Courier New', monospace",
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      color: '#00ff00',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.1
      }}>
        {floatingTexts.map(floatingText => (
          <span
            key={floatingText.id}
            style={{
              position: 'absolute',
              color: '#00ff00',
              fontSize: '12px',
              left: floatingText.left,
              animationDelay: floatingText.animationDelay,
              animation: 'float 6s infinite linear'
            }}
          >
            {floatingText.message}
          </span>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'rgba(0, 0, 0, 0.8)',
        border: '2px solid #00ff00',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
        maxWidth: '600px'
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          minHeight: '60px'
        }}>
          {displayedText.split('').map((char, index) => (
            <span 
              key={index}
              style={shouldGlitch() ? {
                animation: 'glitch 0.1s ease-in-out infinite alternate'
              } : {}}
            >
              {char}
            </span>
          ))}
          {showCursor && (
            <span style={{
              display: 'inline-block',
              backgroundColor: '#00ff00',
              width: '3px',
              animation: 'blink 1s infinite'
            }}>|</span>
          )}
        </div>
        <div style={{
          fontSize: '1.2rem',
          color: '#00ccff',
          opacity: showSubtitle ? 1 : 0,
          transition: 'opacity 1s ease-in',
          marginTop: '20px'
        }}>
          System message delivered successfully
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypewriterNelsonPage;