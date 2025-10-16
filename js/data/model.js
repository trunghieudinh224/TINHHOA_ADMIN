import * as FM from '../common/format.js';

export class SlideshowImage {
    constructor() {
        this.slideshow_no = 0;
        this.slideshow_url = "";
        this.slideshow_base64 = "";
        this.slideshow_position = 0;
        this.note = "";
    }

    setValue(slideshow_no, slideshow_url, slideshow_base64, slideshow_position, note) {
        let data = new SlideshowImage();

        data.slideshow_no = slideshow_no;
        data.slideshow_url = slideshow_url;
        data.slideshow_base64 = slideshow_base64;
        data.slideshow_position = slideshow_position;
        data.note = note;
        return data;
    }

    parseData(responeData) {
        let data = new SlideshowImage();
        if (responeData == null) {
            return data;
        }
        data.slideshow_no = responeData.slideshow_no;
        data.slideshow_url = responeData.slideshow_url;
        data.slideshow_base64 = responeData.slideshow_base64;
        data.slideshow_position = slideshow_position;
        data.note = responeData.note;
        return data;
    }
}

export class Category {
    constructor() {
        this.category_no = 0;
        this.category_id = "";
        this.category_name = "";
        this.category_position = 0;
        this.note = "";
        this.category_image_url = null;
        this.category_image_base64 = null;
        this.category_images = [];
    }

    setValue(category_no, category_id, category_name, category_position, note, category_image_url, category_image_base64, category_images) {
        let data = new Category();

        data.category_no = category_no;
        data.category_id = category_id;
        data.category_name = category_name;
        data.category_position = category_position;
        data.note = note;
        data.category_image_url = category_image_url;
        data.category_image_base64 = category_image_base64;
        data.category_images = category_images;
        return data;
    }

    parseData(responeData) {
        let data = new Category();
        if (responeData == null) {
            return data;
        }
        data.category_no = responeData.category_no;
        data.category_id = responeData.category_id;
        data.category_name = responeData.category_name;
        data.category_position = responeData.category_position;
        data.note = responeData.note;
        data.category_image_url = responeData.category_image_url;
        data.category_image_base64 = responeData.category_image_base64;
        data.category_images = responeData.category_images;
        return data;
    }
}

export class User {
    constructor() {
        this.user_no = 0;
        this.username = "";
        this.password = "";
        this.name = "";
        this.avatar = null;
        this.avatar_base64 = null;
        this.role_no = 1;
        this.phone = null;
        this.email = null;
        this.address = null;
        this.birth = null;
        this.note = "";
    }

    setValue(user_no, username, password, name, avatar, avatar_base64, role_no, phone, email, address, birth, note) {
        let data = new User();

        data.user_no = user_no;
        data.username = username;
        data.password = password;
        data.name = name;
        data.avatar = avatar;
        data.avatar_base64 = avatar_base64;
        data.role_no = role_no;
        data.phone = phone;
        data.email = email;
        data.address = address;
        data.birth = birth;
        data.note = note;
        return data;
    }

    parseData(responeData) {
        let data = new User();
        if (responeData == null) {
            return data;
        }
        data.user_no = responeData.user_no;
        data.username = responeData.username;
        data.password = responeData.password;
        data.name = responeData.name;
        data.avatar = responeData.avatar;
        data.avatar_base64 = responeData.avatar_base64;
        data.role_no = responeData.role_no;
        data.phone = responeData.phone;
        data.email = responeData.email;
        data.address = responeData.address;
        data.birth = responeData.birth;
        data.note = responeData.note;
        return data;
    }
}

export class Question {
    constructor() {
        this.question_no = 0;
        this.question_content = "";
        this.answer_content = "";
        this.question_position = 0;
        this.note = "";
    }

    setValue(question_no, question_content, answer_content, question_position, note) {
        let data = new Question();

        data.question_no = question_no;
        data.question_content = question_content;
        data.answer_content = answer_content;
        data.question_position = question_position;
        data.note = note;
        return data;
    }

    parseData(responeData) {
        let data = new Question();
        if (responeData == null) {
            return data;
        }
        data.question_no = responeData.question_no;
        data.question_content = responeData.question_content;
        data.answer_content = responeData.answer_content;
        data.question_position = responeData.question_position;
        data.note = responeData.note;
        return data;
    }
}