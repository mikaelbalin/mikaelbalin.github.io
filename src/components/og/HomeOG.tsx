export const HomeOG = ({ title }: { title?: string }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#101010",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            position: "relative",
            top: "6px",
            backgroundColor: "#FDFCF9",
            width: "36px",
            height: "36px",
            boxShadow: "0px 0px 5px #FDFCF9",
          }}
        />
        <div
          style={{
            fontFamily: "Inter",
            fontSize: "64px",
            lineHeight: 1,
            color: "#FDFCF9",
            textShadow: "0px 0px 5px #FDFCF9",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
