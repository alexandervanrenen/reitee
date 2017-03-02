
class GamePadControls {
    constructor() {
        // Joy stick
        this.pos = new Point(140, 430);
        this.size = 180; // TODO .. remove ?!
        this.radius = this.size / 2;

        // Switch area
        this.switchPos = new Point(660, 430);
        this.switchRadius = 90;

        // Contact info for movement
        this.ongoingContacts = [];
        this.relevant_contact = null;
        this.moveIntention = new Point();
        this.joyStickPosition = new Point(this.pos.x, this.pos.y);

        // Switch info for switching
        this.activePlayer = player1;
        this.switchTick = 0;
    }

    _getActiveContactById(idToFind) {
        for (let i = 0; i < this.ongoingContacts.length; i++) {
            if (this.ongoingContacts[i].id == idToFind) {
                return i;
            }
        }
        return -1; // not found
    };

    _updateMoveDirection() {
        this.moveIntention.x = (this.relevant_contact.x - this.pos.x) / (this.radius * 0.8);
        this.moveIntention.y = (this.relevant_contact.y - this.pos.y) / (this.radius * 0.8);
    }

    onStartContact(contact) {
        this.ongoingContacts.push(contact);

        // Check if in joy stick circle
        if (this.relevant_contact == null) {
            let dist = Math.sqrt((contact.x - this.pos.x) * (contact.x - this.pos.x) + (contact.y - this.pos.y) * (contact.y - this.pos.y));
            let contactIsInGamePadCircle = dist < 1.2 * this.radius * cr.scale;

            if (contactIsInGamePadCircle) {
                this.relevant_contact = contact;
                this._updateMoveDirection();
            }
        }

        // Check if in switch circle
        if(this.relevant_contact == null) {
            let dist = Math.sqrt((contact.x - this.switchPos.x) * (contact.x - this.switchPos.x) + (contact.y - this.switchPos.y) * (contact.y - this.switchPos.y));
            let contactIsInSwitchCircle = dist < this.switchRadius * cr.scale;

            if(contactIsInSwitchCircle) {
                if (this.activePlayer == player1) {
                    this.activePlayer = player2;
                } else {
                    this.activePlayer = player1;
                }
                this.switchTick = map.tick;
            }
        }
    }

    onMoveContact(id, x, y) {
        let idx = this._getActiveContactById(id);
        if (idx >= 0) {
            this.ongoingContacts[idx].moveTo(x, y);

            if (this.relevant_contact != null && this.relevant_contact.id == id) {
                this._updateMoveDirection();
            }
        }
    }

    onStopContact(id) {
        let idx = this._getActiveContactById(id);
        if (idx >= 0) {
            this.ongoingContacts.splice(idx, 1);

            if (this.relevant_contact != null && this.relevant_contact.id == id) {
                this.relevant_contact = null;
            }
        }
    }

    wantsToMove() {
        return this.relevant_contact != null;
    }

    updateJoyStickPosition() {
        let target;
        if (this.wantsToMove()) {
            target = new Point(this.relevant_contact.x, this.relevant_contact.y);
        } else {
            target = this.pos;
        }

        let dist = util.distance(this.joyStickPosition, target);
        if (dist < 0.3) {
            this.joyStickPosition.assign(target);
        } else {
            this.joyStickPosition.x = this.joyStickPosition.x * 0.9 + target.x * 0.1;
            this.joyStickPosition.y = this.joyStickPosition.y * 0.9 + target.y * 0.1;
        }
    }
}