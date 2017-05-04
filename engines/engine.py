# Copyright (C) 2017 Elvis Teixeira
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

class Engine(object):
    '''Base class for all learning machines, numerical routines or any
    other object that transforms or extracts information from data'''

    def __init__(self, *args, **kwargs):
        '''Stores the user provided keyword arguments into the conf dict
        instance variable. If there is a json_state keyword argument then
        the engine loads it's state from it'''
        self.conf = {k : v for k, v in kwargs.items() if k != 'json_state'}
        if 'json_state' in kwargs: self.load_json(kwargs['json_state'])

    def load_json(self, jsonstr):
        '''Should be reimplemented in subclasses to load the state of the
        engine from a json string (e.g. trained classifier)'''
        raise NotImplementedError(
            'This engine does not know how to import json')

    def dump_json(self):
        '''Should be reimplemented in subclasses to dump the state of the
        engine from to json string (e.g. trained classifier)'''
        raise NotImplementedError(
            'This engine does not know how to export json')

    @property
    def json(self):
        return self.dump_json()

    @json.setter
    def json(self, jsonstr):
        self.load_json(jsonstr)
