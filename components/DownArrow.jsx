"use client";

const DownArrow = ({ onClick, color = "#333", space = "20px" }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    arrow: {
      width: "30px",
      height: "30px",
      borderRight: `10px solid ${color}`,
      borderBottom: `10px solid ${color}`,
      transform: "rotate(45deg)",
      animation: "bounce 2s infinite",
      margin: `${space}`,
    },
    keyframes: `
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: rotate(45deg) translateY(0);
        }
        40% {
          transform: rotate(45deg) translateY(-10px);
        }
        60% {
          transform: rotate(45deg) translateY(-5px);
        }
      }
    `,
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div style={styles.container} onClick={onClick}>
        <div style={styles.arrow}></div>
      </div>
    </>
  );
};

export default DownArrow;
