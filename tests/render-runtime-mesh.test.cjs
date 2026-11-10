const fs=require('fs');
const path=require('path');
const assert=require('node:assert/strict');
const {createCanvas}=require('canvas');
const {renderRuntimeFrame}=require('../dist/spine/render-runtime');
const dir='D:/Codex/spine-mcp-render-mesh-test';fs.mkdirSync(dir,{recursive:true});
const canvas=createCanvas(8,8);const ctx=canvas.getContext('2d');ctx.fillStyle='#ff0000';ctx.fillRect(0,0,8,8);fs.writeFileSync(path.join(dir,'mesh.png'),canvas.toBuffer('image/png'));
fs.writeFileSync(path.join(dir,'mesh.atlas'),'mesh.png\nsize: 8,8\nformat: RGBA8888\nfilter: Linear,Linear\nrepeat: none\nmesh\n  rotate: false\n  xy: 0, 0\n  size: 8, 8\n  orig: 8, 8\n  offset: 0, 0\n  index: -1\n');
const skeleton={skeleton:{spine:'3.8.75'},bones:[{name:'root'}],slots:[{name:'mesh-slot',bone:'root',attachment:'mesh'}],skins:[{name:'default',attachments:{'mesh-slot':{mesh:{type:'mesh',uvs:[0,0,1,0,1,1,0,1],triangles:[0,1,2,0,2,3],vertices:[-4,4,4,4,4,-4,-4,-4],hull:4,width:8,height:8}}}}]};
fs.writeFileSync(path.join(dir,'mesh.json'),JSON.stringify(skeleton));
(async()=>{const frame=await renderRuntimeFrame({skeletonJsonPath:path.join(dir,'mesh.json'),atlasPath:path.join(dir,'mesh.atlas'),imagePath:path.join(dir,'mesh.png'),width:64,height:64});let opaque=0;for(let i=3;i<frame.rgba.length;i+=4)if(frame.rgba[i]>0)opaque++;assert(opaque>100,`mesh preview blank: ${opaque} opaque pixels`);console.log(`mesh preview nonblank: ${opaque} opaque pixels`)})().catch(e=>{console.error(e);process.exitCode=1});

