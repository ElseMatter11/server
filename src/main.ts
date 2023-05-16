import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        const config = new DocumentBuilder()
            .setTitle('Music Back')
            .setDescription('REST API')
            .setVersion('1.0.0')
            .addTag('')
            .build()
        const document  = SwaggerModule.createDocument(app,config)
        SwaggerModule.setup('/api/docs',app,document)

        app.enableCors()
        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()