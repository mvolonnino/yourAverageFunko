const uuid = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

export default uuid;
