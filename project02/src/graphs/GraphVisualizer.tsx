// Por compativilidad se uso la libreria force-graph-2d
// Su documentación esta en este enlace: https://github.com/vasturiano/react-force-graph

import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export const GraphVisualizer = ({ data }: { data: any }) => {
    const fgRef = useRef<any>(null);

    useEffect(() => {
        if (fgRef.current) {
            
            fgRef.current.d3Force('charge').strength(-500);
            fgRef.current.d3Force('link').distance(100);
            fgRef.current.d3Force('center').strength(0.5);
        }
    }, [data]);

    return (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd' }}>
            <ForceGraph2D
                ref={fgRef}
                graphData={data}
                width={700}
                height={500}
                
                linkColor={() => '#1f2025'}
                linkWidth={2}
                //linkDirectionalParticles={2}
                //linkDirectionalParticleSpeed={0.005}

                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = (node as any).label;
                    const fontSize = 14 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    ctx.fillStyle = (node as any).color;
                    ctx.beginPath();
                    ctx.arc(node.x!, node.y!, (node as any).val, 0, 2 * Math.PI, false);
                    ctx.fill();

                    ctx.fillStyle = '#2d3748';
                    ctx.fillText(label, node.x!, node.y! + (node as any).val + 10);
                }}
            />
        </div>
    );
};