import '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import axios from 'axios'


describe('call getProducts', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(
      {
        data: [{title: "Men’s Chill Crew Neck Sweatshirt", price: 75}],
        status: 400
      }
    )
  })

  global.fetch = jest.fn();

  test('call getProducts', async () => {
    const response = await axios.get('http://localhost:3000/api/admin/orders');
    expect(response.data).toEqual([{title: "Men’s Chill Crew Neck Sweatshirt", price: 75}]);

    expect(response.status).toBe(400);
  })
})