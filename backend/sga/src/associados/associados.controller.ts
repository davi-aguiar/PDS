import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssociadosService } from './associados.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAssociadoDTO } from './dto/create-associado.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('associados')
@Controller('associados')
export class AssociadosController {
  constructor(private readonly associadosService: AssociadosService) {}

  @Post('cadastrar')
  @ApiOperation({ summary: 'Cria um novo associado' })
  @ApiResponse({ status: 201, description: 'Associado criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @UseInterceptors(FileInterceptor('imagem'))
  async create(
    @Body() createAssociadoDto: CreateAssociadoDTO,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return await this.associadosService.create(createAssociadoDto, imageFile);
  }

  @Put('atualizar/:id')
  @ApiOperation({ summary: 'Atualiza um associado' })
  @ApiResponse({
    status: 200,
    description: 'Associado atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Associado não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateAssociadoDto: CreateAssociadoDTO,
  ) {
    return await this.associadosService.update(id, updateAssociadoDto);
  }

  @Delete('deletar/:id')
  @ApiOperation({ summary: 'Deleta um associado' })
  @ApiResponse({ status: 204, description: 'Associado deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Associado não encontrado.' })
  async delete(@Param('id') id: string) {
    return await this.associadosService.delete(id);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Lista um associado' })
  @ApiResponse({ status: 200, description: 'Associado encontrado.' })
  @ApiResponse({ status: 404, description: 'Associado não encontrado.' })
  async findAll() {
    return await this.associadosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um associado' })
  @ApiResponse({ status: 200, description: 'Associado encontrado.' })
  @ApiResponse({ status: 404, description: 'Associado não encontrado.' })
  async findById(@Param('id') id: string) {
    return await this.associadosService.findById(id);
  }
}
