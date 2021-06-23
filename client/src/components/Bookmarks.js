import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import '../favs.css';
import '../styles.scss';
import { useSelector } from 'react-redux';


function FavoritePage() {

    const user = useSelector(state => state.user)
    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)

    let variable = { userFrom: localStorage.getItem('userId') }
    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        console.log(variable);
        axios.post('/api/users/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {

                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }
    const onClickDelete = (storyTitle , username) => {
        const variables = {
            storyTitle: storyTitle,
            userFrom: username,
        }
        axios.post('/api/users/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        // const content = (
        //     <div>
        //         {favorite.moviePost ?
        //             <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
        //             : "no image"}
        //     </div>
        // );

        return (<tr key={index}>
          <td><a href={favorite.storyLink}>{favorite.storyTitle}</a></td>
          <td>{favorite.storyAuthor}</td>
          <td><button class="button4" onClick={() => onClickDelete(favorite.storyTitle, favorite.userFrom)}> Remove </button></td>
          </tr>)
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto', paddingLeft: '120px', color: '#096937'}}>
            <h2 > My Bookmarked Articles </h2>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :

                <table>
                    <thead>
                        <tr>
                            <th>Story Title</th>
                            <th>Author Name</th>
                            <td>Remove from bookmarks</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}
export default FavoritePage
