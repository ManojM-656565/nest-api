import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import request from 'supertest';
import { AppModule } from "../src/app.module";



describe('/Orders end-to-end',()=>{
    let app:INestApplication;

    beforeAll(async ()=>{
        const module=await Test.createTestingModule({
            imports:[AppModule],
        }).compile();

        app=module.createNestApplication();
        await app.init();
    });

      it('/POST orders success', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: '1',
        items: [{ productId: '100', quantity: 1 }],
      })
      .expect(201);
  });

  it('/POST orders fail when stock insufficient', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: '1',
        items: [{ productId: '100', quantity: 999 }],
      })
      .expect(400);
  });
})

