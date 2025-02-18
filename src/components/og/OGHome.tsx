export const OGHome = ({ title }: { title?: string }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(45deg, rgba(16,16,16,1) 0%, rgba(203,193,174,1) 100%)",
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
            fontFamily: "Inter",
            fontSize: "64px",
            lineHeight: 1,
            color: "#FDFCF9",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
