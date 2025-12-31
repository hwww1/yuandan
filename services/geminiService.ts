// 纯净版服务：不依赖 Google API，确保国内访问速度和稳定性
// 这是一个精选的“2025好运文案库”

const GREETINGS_LIBRARY = [
  "2025，\n允许一切发生，\n做自己的光，\n不慌不忙，闪闪发亮。",
  "岁岁常欢愉，\n万事皆胜意。\n新的一年，\n烟火向星辰，所愿皆成真。",
  "与其向往，\n不如出发。\n2025，\n行而不辍，未来可期。",
  "保持热爱，\n奔赴山海。\n愿你的2025，\n即使单枪匹马，亦能勇敢无畏。",
  "凡是过往，\n皆为序章。\n所有美好，\n都在2025如约而至。",
  "祝你：\n口袋有钱，\n手中有书，\n眼里有光，\n心中有爱。",
  "2025，\n没有不可治愈的伤痛，\n没有不能结束的沉沦，\n所有失去的，\n都会以另一种方式归来。",
  "愿今年所有的遗憾，\n都是明年惊喜的铺垫。\n2025，\n诸事顺遂。",
  "这一年，\n仅祝你：\n自由，迷人，\n且富有。",
  "去爱，去生活，\n去受伤，去治愈。\n2025，\n听从内心的声音。",
  "即使世界偶尔薄凉，\n内心也要繁花似锦。\n2025，\n浅浅喜，静静爱。",
  "我在2024的尽头，\n祝你在2025的开头：\n平安喜乐，\n万事顺意。"
];

const IMAGES_LIBRARY = [
  "https://images.unsplash.com/photo-1548504778-2c97693e506e?q=80&w=1000&auto=format&fit=crop", // 传统红灯笼
  "https://images.unsplash.com/photo-1516075677024-e7c62bf654f5?q=80&w=1000&auto=format&fit=crop", // 经典红
  "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=1000&auto=format&fit=crop", // 金色烟花
  "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1000&auto=format&fit=crop", // 唯美光斑
  "https://images.unsplash.com/photo-1514424365990-edd907309995?q=80&w=1000&auto=format&fit=crop", // 氛围感
  "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=1000&auto=format&fit=crop", // 红色特写
  "https://images.unsplash.com/photo-1514300451569-83952d7e008a?q=80&w=1000&auto=format&fit=crop"  // 梦幻光影
];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 模拟异步请求，给用户一点“抽取好运”的仪式感
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateNewYearGreeting = async (): Promise<string> => {
  await simulateDelay(600); // 稍微延迟一点点，更有质感
  return getRandom(GREETINGS_LIBRARY);
};

export const generateFestiveImage = async (): Promise<string> => {
  // 图片不需要额外延迟，和文字一起返回即可
  return getRandom(IMAGES_LIBRARY);
};