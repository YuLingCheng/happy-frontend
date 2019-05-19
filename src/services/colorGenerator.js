const getChildHueRotation = (index, totalChildren) => `hue-rotate(${((index - 1) / totalChildren) * 360}deg)`;

export default getChildHueRotation;
