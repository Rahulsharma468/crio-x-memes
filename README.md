# X-Meme 

## Author 
* Name - Rahul Sharma
* Check out [Github Repository](https://github.com/RahulSharma468) to know more

## Generator
This project was generated with [Node JS](https://github.com/nodejs) version 11.0.7.

## About Project
* This Project is Angular Frontend part of X-Meme designed during Crio Winter of Doing (CWodD) Challenge, 2021.

* Check out the deployed site in Nelify [Here](https://crio-x-meme.netlify.app/)

* The API for this project is deployed in Heroku. [Check it out](https://crio-xmeme-boot.herokuapp.com/)

* Check out Github Repository for backend [Here](https://github.com/loneWolf148/X-Meme-Backend.git)

## Angular Components 
1. [HomeComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/home) - Component responsible for rendering content of home page

2. [EditMemeComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/edit-meme) - Component Responsible for editing payload of meme

3. [MemeListComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/meme-list) - Component resposible for rendering 100 most recently uploaded Meme 

4. [MemeComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/meme) - Component resposible for rendering payload of Each meme. Each meme contains name of uploader, caption and Image itself.

5. [UploadMemeComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/upload-meme) - Component resposible for uploading new meme to backed api repository

6. [UploadReviewComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/upload-review) - Component responsible for taking input of user review and calling necessary services to remote API

7. [ReviewListComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/review-list) - Component renders 20 most recently uploaded reviews.

8. [PageNotFoundComponent](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/page-not-found) - Component which will be rendered if 404-page not found error occurs. 

## Models 
Models are present inside [model](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/model) directory

1. [IMeme](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/model/IMeme.model.ts) - Model which represents payload of each meme. Namely they are name of uploader, caption of meme and url of image used in meme. Also, a numerical ID is also present in IMeme which is autogenerated by server. 

2. [IUploadResponse](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/model/IUploadResponse.model.ts) - Response after upload of new meme is succesful

3. [IUpdateResponse](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/model/IUpdateResponse.model.ts) - Response after update of meme payload is succesful.

4. [IReview](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/model/IReview.model.ts) - Model encapsulating review payload.

## Services
1. [MemeService](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/service/meme-service) - All Necessary HTTP Services related to X-Meme are encapsulated.

2. [ReviewServer](https://github.com/loneWolf148/X-Meme-FrontEnd/tree/master/src/app/service/review-service) - All Necarry HTTP Services related to user's review are encapsulated

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Node JS use `ng help` or go check out the [Node JS Overview and Command Reference](https://angular.io/cli) page.