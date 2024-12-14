import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        // "value" is an object containing the file's attributes and metadata
        const oneKb = 1000000;
        return value.size < oneKb;
    }
}