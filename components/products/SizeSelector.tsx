import React, { FC } from 'react'
import { ISize } from '../../interfaces';
import { Box, Button } from '@mui/material';


interface Props{
    selectedSize?: ISize;
    sizes: ISize[];

    //Method
    onSelectSize: (size: ISize) => void;


}
export const SizeSelector:FC<Props> = ({selectedSize, sizes,onSelectSize}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button key={size}
                size='small'
                color={selectedSize === size ? 'primary' : 'info'}
                onClick={() => onSelectSize(size)}
                >
                    {size}
                </Button>
            )) 
            
}
    </Box>
  )
}

