import '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import axios from 'axios'


describe('call getSearch', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(
      {
        data: [{search:'hoodled'}],
        status: 400
      }
    )
  })

  global.fetch = jest.fn();

  test('call getSearch', async () => {
    const response = await axios.get('http://localhost:3000/api/admin/orders');
    expect(response.data).toEqual([{search:'hoodled'}]);

    expect(response.status).toBe(400);
  })
})