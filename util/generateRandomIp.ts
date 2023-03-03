
function generateRandomIp() {
  const randomIp = () => Math.floor(Math.random() * 256);
  return `${randomIp()}.${randomIp()}.${randomIp()}.${randomIp()}`;
}

export default generateRandomIp;
