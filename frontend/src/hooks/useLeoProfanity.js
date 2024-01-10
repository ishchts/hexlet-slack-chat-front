import leoProfanity from 'leo-profanity';

export const useLeoProfanity = (language) => {
  const ruDict = leoProfanity.getDictionary(language);
  leoProfanity.add(ruDict);
  return leoProfanity;
}