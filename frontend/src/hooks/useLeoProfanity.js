import leoProfanity from 'leo-profanity';

export const useLeoProfanity = (language) => {
  const ruDict = leoProfanity.getDictionary(language);
  return leoProfanity.add(ruDict);
};

export default {};
