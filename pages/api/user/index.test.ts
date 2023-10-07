import '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import axios from 'axios'


describe('call getUser', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(
      {
        data: [{user:'luisfer82801@gmail.com'}],
        status: 200
      }
    )
  })

  global.fetch = jest.fn();

  test('call getUser', async () => {
    const response = await axios.get('http://localhost:3000/api/admin/orders');
    expect(response.data).toEqual([{user:'luisfer82801@gmail.com'}]);

    expect(response.status).toBe(200);
  })
})