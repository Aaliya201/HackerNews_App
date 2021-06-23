import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import '../styles.scss';

function Favorite(props) {
      const user = useSelector(state => state.user)
      const storyTitle = props.storyTitle
      const userFrom = props.userFrom
      const storyAuthor = props.storyAuthor
      const storyLink = props.storyLink
      const [FavoriteNumber, setFavoriteNumber] = useState(0)
      const [Favorited, setFavorited] = useState(false)
      const variables = {
          userFrom: userFrom,
          storyTitle: storyTitle,
          storyLink: storyLink,
          storyAuthor: storyAuthor,
        }

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed
            axios.post('/api/users/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet
            console.log(variables);
            axios.post('/api/users/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/users/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios.post('/api/users/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])


    return (
        <>
            <Button style={{color:"white",backgroundColor:"#096937",borderColor:"#096937"}} onClick={onClickFavorite} > {!Favorited ? "Bookmark" : "Un-bookmark"}</Button>
        </>
    )
}

export default Favorite
