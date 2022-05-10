export const blockData = {
    data:
        [
            {
                id: '045019bb',
                displayId: '001a',
                displayName: 'SPOT 6/7 Display (Streaming)',
                metadata: {
                    pricingStrategy: { type: 'TILE_OUTPUT', credits: 3000.000 },
                    blockPricingStrategy: {
                        name: 'simple', unit: 'TILE', direction: 'OUTPUT', credits: 3000
                    }
                }
            }, {
                id: '3e146dd6',
                displayId: '002b',
                displayName: 'Raster Tiling',
                metadata: {
                    pricingStrategy: { type: 'MEGABYTE_INPUT', credits: 0.000 },
                    blockPricingStrategy: {
                        name: 'simple', unit: 'MEGABYTE', direction: 'INPUT', credits: 0
                    }
                }
            }, {
                id: 'zb116d6l',
                displayId: '003c',
                displayName: 'Pleiades',
                metadata: {
                    pricingStrategy: { type: 'MEGABYTE_INPUT', credits: 100.000 },
                    blockPricingStrategy: {
                        name: 'simple', unit: 'MEGABYTE', direction: 'INPUT', credits: 100
                    }
                }
            }, {
                id: '4g1400yz',
                displayId: '004d',
                displayName: 'No name',
                metadata: {
                    pricingStrategy: { type: 'test', credits: 0.000 },
                    blockPricingStrategy: {
                        name: 'complicated', unit: 'drops', direction: 'INPUT', credits: 0
                    }
                }
            }
        ],
    error: null
};
