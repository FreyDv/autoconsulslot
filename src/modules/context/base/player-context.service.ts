import { Injectable } from '@nestjs/common';
import { ContextService } from '@modules/context/base/context.service';
import { Player } from '@models/player';
import { Site } from '@models/site';


enum PLAYER_CONTEXT_KEY {
  PLAYER = 'PLAYER',
  SITE = 'SITE'
}

@Injectable()
export class PlayerContextService {

  constructor(private readonly contextService: ContextService) {
  }

  setPlayerContext(player: Player, site: Site) {
    this.contextService.set(PLAYER_CONTEXT_KEY.PLAYER, player);
    this.contextService.set(PLAYER_CONTEXT_KEY.SITE, site);
  }

  isPlayer(): boolean {
    return true;
  }

  isBoUser(): boolean {
    return false;
  }

  getBaseUrl(): string {
    return this.getSite().apiBaseUrl;
  }

  getPlayer(): Player {
    const player = this.contextService.get<Player>(PLAYER_CONTEXT_KEY.PLAYER);
    // if (!player) {
    //   throw new Error(`${PLAYER_CONTEXT_KEY.PLAYER} not found in ${PlayerContextService.name}`);
    // }
    return player;
  }


  getSite(): Site {
    return this.contextService.get<Site>(PLAYER_CONTEXT_KEY.SITE);
  }
}