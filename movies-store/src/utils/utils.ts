export const addToFavorite = (userId: number, id: number, mediaType: string | null) => {
  const favoriteData = {
    userId: userId,
    id,
    mediaType,
  };

  try {
    const newFavorites = fetch('http://localhost:8081/api/addToFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteData),
    }).then((response) => response.json());
    return newFavorites;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromFavorite = (userId: number, id: number, mediaType: string | null) => {
  const favoriteData = {
    userId: userId,
    id,
    mediaType,
  };

  try {
    return fetch('http://localhost:8081/api/deleteFromFavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteData),
    })
      .then((response) => response.json())
      .then((response) => response);
  } catch (error) {
    console.log(error);
  }
};
