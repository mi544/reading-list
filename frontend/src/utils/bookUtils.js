export const getBestQualityThumbnail = (volumeInfo) => {
  if (!volumeInfo.imageLinks) return null

  const { imageLinks } = volumeInfo

  if (imageLinks.extraLarge) return imageLinks.extraLarge
  if (imageLinks.large) return imageLinks.large
  if (imageLinks.medium) return imageLinks.medium
  if (imageLinks.small) return imageLinks.small
  if (imageLinks.smallThumbnail) return imageLinks.smallThumbnail
  if (imageLinks.thumbnail) return imageLinks.thumbnail

  return null
}
