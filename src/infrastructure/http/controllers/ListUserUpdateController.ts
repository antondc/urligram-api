import { Request, Response } from 'express';

import { IListUserUpdateUseCase } from '@domain/list/useCases/ListUserUpdateUseCase';
import { URL_SERVER } from '@shared/constants/env';
import { BaseController } from './BaseController';

export class ListUserUpdateController extends BaseController {
  useCase: IListUserUpdateUseCase;

  constructor(useCase: IListUserUpdateUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { newRole } = req.body;

    const newRoleMap = {
      admin: 1,
      user: 2,
    };
    
    const linkUserUpdateRequestDTO = {
      listId: Number(id),
      userId,
      newRole: newRoleMap[newRole],
    };

    const response = await this.useCase.execute(linkUserUpdateRequestDTO);

    const formattedResponse = {
      links: {
        self: URL_SERVER + '/lists/' + response.listId,
      },
      data: [
        {
          type: 'list',
          session: {
            self: URL_SERVER + '/lists/' + response.listId,
          },
          attributes: response,
          relationships: {},
        },
      ],
      included: [],
    };

    return res.status(200).send(formattedResponse);
  }
}
