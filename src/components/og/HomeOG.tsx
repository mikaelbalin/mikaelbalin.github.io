export const HomeOG = ({ title }: { title?: string }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        backgroundColor: "#e5e5f7",
        opacity: 0.8,
        backgroundImage: "radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      {title}
    </div>
  );
};
