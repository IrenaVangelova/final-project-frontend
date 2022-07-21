const SectionTitle = (props) => {
  return (
    <div style={{ display: 'flex', alignText: 'flex-end', marginTop: '5rem' }}>
      <div className='unnamed-character-style-5' style={{ lineHeight: "40px" }}>{props.title}</div>
      <div
        style={{
          borderBottom: '1px solid #D8D8D8',
          flexGrow: '1',
          marginBottom: '0.7rem',
          marginLeft: '2rem',
        }}
      ></div>
    </div>
  );
};

export default SectionTitle;