import React from 'react'
import Story from './Story'
import styled from 'styled-components'

const Stories = () => {
    return (
        <StoriesWrapper>
            <Story 
                image="https://images.unsplash.com/photo-1602524206684-fdf6393c7d89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                profileSrc="https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400.jpg"
                title="Nabendu"
            />
            <Story 
                image="https://images.unsplash.com/photo-1602526430780-782d6b1783fa?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                profileSrc="https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400.jpg"
                title="TWD"
            />
            <Story 
                image="https://www.jonesday.com/-/media/files/publications/2019/05/when-coding-is-criminal/when-coding-is-criminal.jpg?h=800&w=1600&la=en&hash=5522AA91198A168017C511FCBE77E201"
                profileSrc="https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400.jpg"
                title="Nabendu"
            />
        </StoriesWrapper>
    )
}

const StoriesWrapper = styled.div`
    display: flex;
`

export default Stories