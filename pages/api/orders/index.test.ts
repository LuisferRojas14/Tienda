import '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import axios from 'axios'


describe('call getOrders', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(
      {
        data: [{id: 1, city:"Valledupar"}],
        status: 400
      }
    )
  })

  global.fetch = jest.fn();

  test('call getOrders', async () => {
    const response = await axios.get('http://localhost:3000/api/admin/orders');
    expect(response.data).toEqual([{id: 1, city:"Valledupar"}]);

    expect(response.status).toBe(400);
  })
})