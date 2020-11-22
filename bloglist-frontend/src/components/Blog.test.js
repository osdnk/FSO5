import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'

const sampleBlog = {
  id: 'id',
  url: 'google.com',
  title: '!)!)!',
  author: 'mike',
  likes: 3,
  user: {
    username: 'some'
  }
}

test('renders correctly content', () => {

  const component = render(
    <Blog
      blog={sampleBlog}
      updateBlog={jest.fn}
      deleteBlog={jest.fn}
      user={{}}
    />
  )

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const likes = component.container.querySelector('.likes')
  const url = component.container.querySelector('.url')

  expect(title).toHaveTextContent('!)!)!')
  expect(author).toHaveTextContent('mike')
  expect(likes).toBeNull()
  expect(url).toBeNull()
})

test('shows additional content witout delete', () => {
  const component = render(
    <Blog
      blog={sampleBlog}
      updateBlog={jest.fn}
      deleteBlog={jest.fn}
      user={{ username: 'some2' }}
    />
  )

  const button = component.container.querySelector('.expand')
  fireEvent.click(button)

  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')
  const deletes = component.container.querySelector('.delete')

  expect(url).toHaveTextContent('URL:google.com')
  expect(likes).toHaveTextContent('Likes: 3')
  expect(deletes).toBeNull()

})


test('shows additional content with delete', () => {
  const component = render(
    <Blog
      blog={sampleBlog}
      updateBlog={jest.fn}
      deleteBlog={jest.fn}
      user={{ username: 'some' }}
    />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const deletes = component.container.querySelector('.delete')

  expect(deletes).not.toBeNull()

})

test('button like will be double clicked', () => {
  const func = jest.fn()

  const component = render(
    <Blog
      blog={sampleBlog}
      updateBlog={func}
      deleteBlog={jest.fn}
      user={{ username: 'some' }}
    />
  )

  const button = component.container.querySelector('.expand')
  fireEvent.click(button)

  const like = component.container.querySelector('.like')

  fireEvent.click(like)
  fireEvent.click(like)
  expect(func).toHaveBeenCalledTimes(2)
})
