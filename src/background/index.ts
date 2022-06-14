import { getStorageBooks, addBookIntoStorage, deleteBookFromStorage } from './storage';
import {initExtension, ExtensionType} from '@/common/js/chrome-extension';

const storage = {
    getStorageBooks, addBookIntoStorage, deleteBookFromStorage
}



const extension = initExtension(ExtensionType.Background, {storage})